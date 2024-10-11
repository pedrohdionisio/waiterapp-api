import type { IUser } from '@/app/entities';
import { addPrefix } from '@/app/utils';
import {
	AdminDeleteUserCommand,
	type CognitoIdentityProviderClient,
	SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider';
import {
	DeleteCommand,
	type DynamoDBDocumentClient,
	PutCommand,
	QueryCommand,
	type QueryCommandOutput
} from '@aws-sdk/lib-dynamodb';
import { ulid } from 'ulid';
import type {
	ICreateUserDTO,
	IDeleteUserDTO,
	IUsersRepository
} from './UsersRepository.types';

export class UsersRepository implements IUsersRepository {
	constructor(
		private readonly cognitoClient: CognitoIdentityProviderClient,
		private readonly dynamoClient: DynamoDBDocumentClient
	) {}

	async create(dto: ICreateUserDTO): Promise<void> {
		const cognitoCommand = new SignUpCommand({
			ClientId: process.env.COGNITO_CLIENT_ID,
			Username: dto.email,
			Password: dto.password,
			UserAttributes: [
				{
					Name: 'name',
					Value: dto.name
				},
				{
					Name: 'custom:role',
					Value: dto.role
				}
			]
		});

		const { UserSub } = await this.cognitoClient.send(cognitoCommand);

		const sortableId = ulid();

		const dynamoCommand = new PutCommand({
			TableName: 'WaiterAppTable',
			Item: {
				PK: addPrefix('user', sortableId),
				SK: addPrefix('user', sortableId),
				GSI1PK: 'USERS',
				GSI1SK: addPrefix('user', dto.email),
				type: 'User',
				id: sortableId,
				name: dto.name,
				role: dto.role,
				externalId: UserSub,
				email: dto.email,
				createdAt: new Date().toISOString(),
				deletedAt: new Date().toISOString()
			}
		});

		await this.dynamoClient.send(dynamoCommand);
	}

	async delete(dto: IDeleteUserDTO): Promise<void> {
		const cognitoCommand = new AdminDeleteUserCommand({
			UserPoolId: process.env.COGNITO_USER_POOL_ID,
			Username: dto.email
		});

		await this.cognitoClient.send(cognitoCommand);

		const dynamoCommand = new DeleteCommand({
			TableName: 'WaiterAppTable',
			Key: {
				PK: addPrefix('user', dto.userId),
				SK: addPrefix('user', dto.userId)
			}
		});

		await this.dynamoClient.send(dynamoCommand);
	}

	async list(): Promise<IUser[]> {
		const command = new QueryCommand({
			TableName: 'WaiterAppTable',
			ScanIndexForward: false,
			IndexName: 'GSI1PK-GSI1SK-index',
			KeyConditionExpression: '#DDB_GSI1PK = :pkey',
			ExpressionAttributeValues: {
				':pkey': 'USERS'
			},
			ExpressionAttributeNames: {
				'#DDB_GSI1PK': 'GSI1PK'
			},
			Limit: 100
		});

		const { Items } = (await this.dynamoClient.send(command)) as Omit<
			QueryCommandOutput,
			'Items'
		> & { Items: IUser[] };

		if (!Items) {
			return [];
		}

		return Items.map((item) => {
			return {
				name: item.name,
				email: item.email,
				externalId: item.externalId,
				id: item.id,
				role: item.role
			};
		});
	}
}

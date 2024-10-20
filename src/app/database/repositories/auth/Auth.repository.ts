import { addPrefix } from '@/app/utils';
import {
	type CognitoIdentityProviderClient,
	ConfirmForgotPasswordCommand,
	ConfirmSignUpCommand,
	ForgotPasswordCommand,
	InitiateAuthCommand,
	SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { type DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { ulid } from 'ulid';
import type {
	IAuthRepository,
	IConfirmAccountDTO,
	ICreateUserDTO,
	IForgotPasswordDTO,
	ILoginDTO,
	ILoginReturn,
	IRefreshTokenDTO,
	IRefreshTokenReturn,
	IResetPasswordDTO,
	IResetPasswordReturn
} from './AuthRepository.types';

export class AuthRepository implements IAuthRepository {
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
				createdAt: new Date().toISOString(),
				deletedAt: new Date().toISOString()
			}
		});

		await this.dynamoClient.send(dynamoCommand);
	}

	async confirmAccount(dto: IConfirmAccountDTO): Promise<void> {
		const command = new ConfirmSignUpCommand({
			ClientId: process.env.COGNITO_CLIENT_ID,
			Username: dto.email,
			ConfirmationCode: dto.code
		});

		await this.cognitoClient.send(command);
	}

	async login(dto: ILoginDTO): Promise<ILoginReturn> {
		const command = new InitiateAuthCommand({
			ClientId: process.env.COGNITO_CLIENT_ID,
			AuthFlow: 'USER_PASSWORD_AUTH',
			AuthParameters: {
				USERNAME: dto.email,
				PASSWORD: dto.password
			}
		});

		const { AuthenticationResult } = await this.cognitoClient.send(command);

		return {
			accessToken: AuthenticationResult?.AccessToken,
			refreshToken: AuthenticationResult?.RefreshToken
		};
	}

	async refreshToken(dto: IRefreshTokenDTO): Promise<IRefreshTokenReturn> {
		const command = new InitiateAuthCommand({
			ClientId: process.env.COGNITO_CLIENT_ID,
			AuthFlow: 'REFRESH_TOKEN_AUTH',
			AuthParameters: {
				REFRESH_TOKEN: dto.refreshToken
			}
		});

		const { AuthenticationResult } = await this.cognitoClient.send(command);

		return {
			accessToken: AuthenticationResult?.AccessToken
		};
	}

	async forgotPassword(dto: IForgotPasswordDTO): Promise<void> {
		const command = new ForgotPasswordCommand({
			ClientId: process.env.COGNITO_CLIENT_ID,
			Username: dto.email
		});

		await this.cognitoClient.send(command);
	}

	async resetPassword(dto: IResetPasswordDTO): Promise<IResetPasswordReturn> {
		const resetPasswordCommand = new ConfirmForgotPasswordCommand({
			ClientId: process.env.COGNITO_CLIENT_ID,
			Username: dto.email,
			ConfirmationCode: dto.code,
			Password: dto.newPassword
		});

		await this.cognitoClient.send(resetPasswordCommand);

		const loginCommand = new InitiateAuthCommand({
			ClientId: process.env.COGNITO_CLIENT_ID,
			AuthFlow: 'USER_PASSWORD_AUTH',
			AuthParameters: {
				USERNAME: dto.email,
				PASSWORD: dto.newPassword
			}
		});

		const { AuthenticationResult } =
			await this.cognitoClient.send(loginCommand);

		return {
			accessToken: AuthenticationResult?.AccessToken,
			refreshToken: AuthenticationResult?.RefreshToken
		};
	}
}

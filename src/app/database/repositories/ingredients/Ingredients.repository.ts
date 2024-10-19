import type { IIngredient } from '@/app/entities';
import { addPrefix } from '@/app/utils';
import {
	DeleteCommand,
	type DynamoDBDocumentClient,
	PutCommand,
	QueryCommand,
	type QueryCommandOutput
} from '@aws-sdk/lib-dynamodb';
import { ulid } from 'ulid';
import type {
	ICreateIngredientDTO,
	IDeleteIngredientDTO,
	IIngredientsRepository
} from './IngredientsRepository.types';

export class IngredientsRepository implements IIngredientsRepository {
	constructor(private readonly dynamoClient: DynamoDBDocumentClient) {}

	async create(dto: ICreateIngredientDTO): Promise<void> {
		const sortableId = ulid();

		const dynamoCommand = new PutCommand({
			TableName: 'WaiterAppTable',
			ConditionExpression: 'attribute_not_exists(PK)',
			Item: {
				PK: 'INGREDIENTS',
				SK: addPrefix('ingredient', dto.name),
				GSI1PK: 'PRODUCTS',
				GSI1SK: addPrefix('ingredient', sortableId),
				type: 'Ingredient',
				id: sortableId,
				name: dto.name,
				icon: dto.icon,
				createdAt: new Date().toISOString()
			}
		});

		await this.dynamoClient.send(dynamoCommand);
	}

	async list(): Promise<IIngredient[]> {
		const command = new QueryCommand({
			TableName: 'WaiterAppTable',
			ScanIndexForward: false,
			KeyConditionExpression: '#PKEY = :pkey',
			ExpressionAttributeValues: {
				':pkey': 'INGREDIENTS'
			},
			ExpressionAttributeNames: {
				'#PKEY': 'PK'
			},
			Limit: 100
		});

		const { Items } = (await this.dynamoClient.send(command)) as Omit<
			QueryCommandOutput,
			'Items'
		> & { Items: IIngredient[] };

		if (!Items) {
			return [];
		}

		return Items.map((item) => {
			return {
				id: item.id,
				name: item.name,
				icon: item.icon
			};
		});
	}

	async delete(dto: IDeleteIngredientDTO): Promise<void> {
		const command = new DeleteCommand({
			TableName: 'WaiterAppTable',
			Key: {
				PK: 'INGREDIENTS',
				SK: addPrefix('ingredient', dto.name)
			}
		});

		await this.dynamoClient.send(command);
	}
}

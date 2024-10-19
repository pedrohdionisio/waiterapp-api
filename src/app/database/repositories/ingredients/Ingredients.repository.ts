import type { IIngredient } from '@/app/entities';
import { AppError } from '@/app/errors';
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
	IGetIngredientByIdDTO,
	IIngredientsRepository,
	IUpdateIngredientDTO
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

	async getIngredientById(dto: IGetIngredientByIdDTO): Promise<IIngredient> {
		const command = new QueryCommand({
			TableName: 'WaiterAppTable',
			IndexName: 'GSI1PK-GSI1SK-index',
			KeyConditionExpression: '#GSI1PKEY = :GSI1PKEY and #GSI1SKEY = :GSI1SKEY',
			ExpressionAttributeValues: {
				':GSI1PKEY': 'PRODUCTS',
				':GSI1SKEY': addPrefix('ingredient', dto.id)
			},
			ExpressionAttributeNames: {
				'#GSI1PKEY': 'GSI1PK',
				'#GSI1SKEY': 'GSI1SK'
			},
			Limit: 100
		});

		const { Items } = (await this.dynamoClient.send(command)) as Omit<
			QueryCommandOutput,
			'Items'
		> & { Items: IIngredient[] };

		return Items[0];
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

	async update(dto: IUpdateIngredientDTO): Promise<void> {
		const ingredient = await this.getIngredientById({ id: dto.id });

		if (!ingredient) {
			throw new AppError('Ingredient not found.', 404);
		}

		await this.delete({ name: ingredient.name });

		const command = new PutCommand({
			TableName: 'WaiterAppTable',
			ConditionExpression: 'attribute_not_exists(PK)',
			Item: {
				PK: 'INGREDIENTS',
				SK: addPrefix('ingredient', dto.name),
				GSI1PK: 'PRODUCTS',
				GSI1SK: addPrefix('ingredient', ingredient.id),
				type: 'Ingredient',
				id: ingredient.id,
				name: dto.name,
				icon: dto.icon,
				createdAt: ingredient.createdAt
			}
		});

		await this.dynamoClient.send(command);
	}
}

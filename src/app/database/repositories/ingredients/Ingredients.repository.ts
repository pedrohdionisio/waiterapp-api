import { addPrefix } from '@/app/utils';
import { type DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { ulid } from 'ulid';
import type {
	ICreateIngredientDTO,
	IIngredientsRepository
} from './IngredientsRepository.types';

export class IngredientsRepository implements IIngredientsRepository {
	constructor(private readonly dynamoClient: DynamoDBDocumentClient) {}

	async create(dto: ICreateIngredientDTO): Promise<void> {
		const sortableId = ulid();

		const dynamoCommand = new PutCommand({
			TableName: 'WaiterAppTable',
			Item: {
				PK: addPrefix('ingredient', sortableId),
				SK: addPrefix('ingredient', sortableId),
				GSI1PK: 'INGREDIENTS',
				type: 'Ingredient',
				id: sortableId,
				name: dto.name,
				icon: dto.icon,
				createdAt: new Date().toISOString()
			}
		});

		await this.dynamoClient.send(dynamoCommand);
	}
}

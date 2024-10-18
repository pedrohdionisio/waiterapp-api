import { CreateIngredientSchema } from '@/app/modules/ingredients/schemas';
import type { ICreateIngredientService } from '@/app/modules/ingredients/services/create-ingredient/CreateIngredientService.types';
import type {
	IController,
	IProtectedRequest,
	IPublicRequest,
	IResponse
} from '@/app/types';
import { parseSchema } from '@/app/utils';
import { NotAuthorizedException } from '@aws-sdk/client-cognito-identity-provider';
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';

export class CreateIngredientController implements IController {
	constructor(
		private readonly createIngredientService: ICreateIngredientService
	) {}

	async handle(
		request: IPublicRequest | IProtectedRequest
	): Promise<IResponse> {
		try {
			const parsedBody = parseSchema(CreateIngredientSchema, request.body);

			if (!parsedBody.success) {
				return {
					body: parsedBody.data.message,
					statusCode: parsedBody.data.statusCode
				};
			}

			await this.createIngredientService.execute(parsedBody.data);

			return {
				body: null,
				statusCode: 201
			};
		} catch (error) {
			if (error instanceof ConditionalCheckFailedException) {
				return {
					statusCode: 409,
					body: {
						error: 'Ingredient already exists.'
					}
				};
			}

			if (error instanceof NotAuthorizedException) {
				return {
					statusCode: 401,
					body: {
						error: 'Not authorized.'
					}
				};
			}

			return {
				statusCode: 500,
				body: {
					error: 'Internal Server Error.'
				}
			};
		}
	}
}

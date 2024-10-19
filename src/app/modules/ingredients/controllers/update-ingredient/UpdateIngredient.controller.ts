import { AppError } from '@/app/errors';
import { UpdateIngredientSchema } from '@/app/modules/ingredients/schemas';
import type { IUpdateIngredientService } from '@/app/modules/ingredients/services/update-ingredient/UpdateIngredientService.types';
import type {
	IController,
	IProtectedRequest,
	IPublicRequest,
	IResponse
} from '@/app/types';
import { parseSchema } from '@/app/utils';
import { NotAuthorizedException } from '@aws-sdk/client-cognito-identity-provider';
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb';

export class UpdateIngredientController implements IController {
	constructor(
		private readonly updateIngredientService: IUpdateIngredientService
	) {}

	async handle(
		request: IPublicRequest | IProtectedRequest
	): Promise<IResponse> {
		try {
			const parsedBody = parseSchema(UpdateIngredientSchema, request.body);
			const { ingredientId } = request.params;

			if (!parsedBody.success) {
				return {
					body: parsedBody.data.message,
					statusCode: parsedBody.data.statusCode
				};
			}

			await this.updateIngredientService.execute({
				...parsedBody.data,
				id: ingredientId as string
			});

			return {
				body: null,
				statusCode: 201
			};
		} catch (error) {
			if (error instanceof AppError) {
				return {
					statusCode: error.statusCode,
					body: {
						error: error.message
					}
				};
			}

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

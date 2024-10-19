import { DeleteIngredientSchema } from '@/app/modules/ingredients/schemas';
import type { IDeleteIngredientService } from '@/app/modules/ingredients/services/delete-ingredient/DeleteIngredientService.types';
import type {
	IController,
	IProtectedRequest,
	IPublicRequest,
	IResponse
} from '@/app/types';
import { parseSchema } from '@/app/utils';
import { NotAuthorizedException } from '@aws-sdk/client-cognito-identity-provider';

export class DeleteIngredientController implements IController {
	constructor(
		private readonly deleteIngredientService: IDeleteIngredientService
	) {}

	async handle(
		request: IPublicRequest | IProtectedRequest
	): Promise<IResponse> {
		try {
			const parsedBody = parseSchema(DeleteIngredientSchema, request.body);

			if (!parsedBody.success) {
				return {
					body: parsedBody.data.message,
					statusCode: parsedBody.data.statusCode
				};
			}

			await this.deleteIngredientService.execute(parsedBody.data);

			return {
				body: null,
				statusCode: 204
			};
		} catch (error) {
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

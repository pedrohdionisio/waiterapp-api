import type { IListIngredientsService } from '@/app/modules/ingredients/services/list-ingredients/ListIngredientsService.types';
import type { IController, IResponse } from '@/app/types';
import { NotAuthorizedException } from '@aws-sdk/client-cognito-identity-provider';

export class ListIngredientsController implements IController {
	constructor(
		private readonly listIngredientsService: IListIngredientsService
	) {}

	async handle(): Promise<IResponse> {
		try {
			const ingredients = await this.listIngredientsService.execute();

			return {
				body: ingredients,
				statusCode: 200
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

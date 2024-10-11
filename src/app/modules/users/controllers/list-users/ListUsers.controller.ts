import type { IListUsersService } from '@/app/modules/users/services/list-users/ListUsersService.types';
import type { IController, IResponse } from '@/app/types';
import { NotAuthorizedException } from '@aws-sdk/client-cognito-identity-provider';

export class ListUsersController implements IController {
	constructor(private readonly listUsersService: IListUsersService) {}

	async handle(): Promise<IResponse> {
		try {
			const response = await this.listUsersService.execute();

			return {
				body: { ...response },
				statusCode: 201
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

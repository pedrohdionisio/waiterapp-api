import { DeleteUserSchema } from '@/app/modules/users/schemas';
import type { IDeleteUserService } from '@/app/modules/users/services/delete-user/DeleteUserService.types';
import type { IController, IProtectedRequest, IResponse } from '@/app/types';
import { parseSchema } from '@/app/utils';
import {
	NotAuthorizedException,
	UserNotFoundException
} from '@aws-sdk/client-cognito-identity-provider';

export class DeleteUserController implements IController {
	constructor(private readonly deleteUserService: IDeleteUserService) {}

	async handle(request: IProtectedRequest): Promise<IResponse> {
		try {
			const parsedBody = parseSchema(DeleteUserSchema, request.body);

			if (!parsedBody.success) {
				return {
					body: parsedBody.data.message,
					statusCode: parsedBody.data.statusCode
				};
			}

			await this.deleteUserService.execute(parsedBody.data);

			return {
				body: null,
				statusCode: 204
			};
		} catch (error) {
			if (error instanceof UserNotFoundException) {
				return {
					statusCode: 404,
					body: {
						error: 'User not found.'
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

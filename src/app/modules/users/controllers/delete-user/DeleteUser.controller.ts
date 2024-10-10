import { DeleteUserSchema } from '@/app/modules/users/schemas';
import type { IDeleteUserService } from '@/app/modules/users/services/delete-user/DeleteUserService.types';
import type { IController, IRequest, IResponse } from '@/app/types';
import { parseSchema } from '@/app/utils';
import {
	NotAuthorizedException,
	UsernameExistsException
} from '@aws-sdk/client-cognito-identity-provider';

export class DeleteUserController implements IController {
	constructor(private readonly deleteUserService: IDeleteUserService) {}

	async handle(request: IRequest): Promise<IResponse> {
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
			if (error instanceof UsernameExistsException) {
				return {
					statusCode: 409,
					body: {
						error: 'This e-mail is already in use.'
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

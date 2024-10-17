import { AppError } from '@/app/errors';
import { UpdateUserSchema } from '@/app/modules/users/schemas';
import type { IUpdateUserService } from '@/app/modules/users/services/update-user/UpdateUserService.types';
import type { IController, IProtectedRequest, IResponse } from '@/app/types';
import { parseSchema } from '@/app/utils';
import {
	NotAuthorizedException,
	ResourceNotFoundException,
	UsernameExistsException
} from '@aws-sdk/client-cognito-identity-provider';

export class UpdateUserController implements IController {
	constructor(private readonly updateUserService: IUpdateUserService) {}

	async handle(request: IProtectedRequest): Promise<IResponse> {
		try {
			const parsedBody = parseSchema(UpdateUserSchema, request.body);
			const { userId } = request.params;

			if (!parsedBody.success) {
				return {
					body: parsedBody.data.message,
					statusCode: parsedBody.data.statusCode
				};
			}

			await this.updateUserService.execute({
				...parsedBody.data,
				id: (userId as string) || ''
			});

			return {
				body: null,
				statusCode: 200
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

			if (error instanceof UsernameExistsException) {
				return {
					statusCode: 409,
					body: {
						error: 'This e-mail is already in use.'
					}
				};
			}

			if (error instanceof ResourceNotFoundException) {
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

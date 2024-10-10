import { CreateUserSchema } from '@/app/modules/users/schemas';
import type { ICreateUserService } from '@/app/modules/users/services/create-user/CreateUserService.types';
import type { IController, IRequest, IResponse } from '@/app/types';
import { parseSchema } from '@/app/utils';
import {
	NotAuthorizedException,
	UsernameExistsException
} from '@aws-sdk/client-cognito-identity-provider';

export class CreateUserController implements IController {
	constructor(private readonly createUserService: ICreateUserService) {}

	async handle(request: IRequest): Promise<IResponse> {
		try {
			const parsedBody = parseSchema(CreateUserSchema, request.body);

			if (!parsedBody.success) {
				return {
					body: parsedBody.data.message,
					statusCode: parsedBody.data.statusCode
				};
			}

			await this.createUserService.execute(parsedBody.data);

			return {
				body: null,
				statusCode: 201
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

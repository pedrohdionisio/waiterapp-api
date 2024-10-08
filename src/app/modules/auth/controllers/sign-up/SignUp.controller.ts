import { SignUpSchema } from '@/app/modules/auth/schemas';
import type { ISignUpService } from '@/app/modules/auth/services/sign-up/SignUpService.types';
import type { IController, IRequest, IResponse } from '@/app/types';
import { parseSchema } from '@/app/utils';
import {
	NotAuthorizedException,
	UsernameExistsException
} from '@aws-sdk/client-cognito-identity-provider';

export class SignUpController implements IController {
	constructor(private readonly signUpService: ISignUpService) {}

	async handle(request: IRequest): Promise<IResponse> {
		try {
			const parsedBody = parseSchema(SignUpSchema, request.body);

			if (!parsedBody.success) {
				return {
					body: parsedBody.data.message,
					statusCode: parsedBody.data.statusCode
				};
			}

			const response = await this.signUpService.execute(parsedBody.data);

			return {
				body: {
					...response
				},
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

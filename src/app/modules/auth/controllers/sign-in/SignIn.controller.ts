import { SignInSchema } from '@/app/modules/auth/schemas';
import type { ISignInService } from '@/app/modules/auth/services/sign-in/SignInService.types';
import type { IController, IProtectedRequest, IResponse } from '@/app/types';
import { parseSchema } from '@/app/utils';
import {
	InvalidParameterException,
	NotAuthorizedException,
	UserNotFoundException
} from '@aws-sdk/client-cognito-identity-provider';

export class SignInController implements IController {
	constructor(private readonly signInService: ISignInService) {}

	async handle(request: IProtectedRequest): Promise<IResponse> {
		try {
			const parsedBody = parseSchema(SignInSchema, request.body);

			if (!parsedBody.success) {
				return {
					body: parsedBody.data.message,
					statusCode: parsedBody.data.statusCode
				};
			}

			const response = await this.signInService.execute(parsedBody.data);

			return {
				body: {
					...response
				},
				statusCode: 201
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

			if (
				error instanceof InvalidParameterException ||
				error instanceof NotAuthorizedException
			) {
				return {
					statusCode: 401,
					body: {
						error: 'Invalid credentials.'
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

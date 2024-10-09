import { ResetPasswordSchema } from '@/app/modules/auth/schemas';
import type { IResetPasswordService } from '@/app/modules/auth/services/reset-password/ResetPasswordService.types';
import type { IController, IRequest, IResponse } from '@/app/types';
import { parseSchema } from '@/app/utils';
import {
	CodeMismatchException,
	ExpiredCodeException,
	UserNotFoundException
} from '@aws-sdk/client-cognito-identity-provider';

export class ResetPasswordController implements IController {
	constructor(private readonly resetPasswordService: IResetPasswordService) {}

	async handle(request: IRequest): Promise<IResponse> {
		try {
			const parsedBody = parseSchema(ResetPasswordSchema, request.body);

			if (!parsedBody.success) {
				return {
					body: parsedBody.data.message,
					statusCode: parsedBody.data.statusCode
				};
			}

			await this.resetPasswordService.execute(parsedBody.data);

			return {
				body: null,
				statusCode: 204
			};
		} catch (error) {
			if (error instanceof CodeMismatchException) {
				return {
					statusCode: 409,
					body: {
						error: 'Invalid confirmation code.'
					}
				};
			}

			if (error instanceof ExpiredCodeException) {
				return {
					statusCode: 400,
					body: {
						error: 'Expired confirmation code.'
					}
				};
			}

			if (error instanceof UserNotFoundException) {
				return {
					statusCode: 404,
					body: {
						error: 'User not found.'
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

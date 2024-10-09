import { ForgotPasswordSchema } from '@/app/modules/auth/schemas';
import type { IForgotPasswordService } from '@/app/modules/auth/services/forgot-password/ForgotPasswordService.types';
import type { IController, IRequest, IResponse } from '@/app/types';
import { parseSchema } from '@/app/utils';
import { UserNotFoundException } from '@aws-sdk/client-cognito-identity-provider';

export class ForgotPasswordController implements IController {
	constructor(private readonly forgotPasswordService: IForgotPasswordService) {}

	async handle(request: IRequest): Promise<IResponse> {
		try {
			const parsedBody = parseSchema(ForgotPasswordSchema, request.body);

			if (!parsedBody.success) {
				return {
					body: parsedBody.data.message,
					statusCode: parsedBody.data.statusCode
				};
			}

			await this.forgotPasswordService.execute(parsedBody.data);

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

			return {
				statusCode: 500,
				body: {
					error: 'Internal Server Error.'
				}
			};
		}
	}
}

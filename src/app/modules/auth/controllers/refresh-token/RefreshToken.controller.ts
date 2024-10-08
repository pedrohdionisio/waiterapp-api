import { RefreshTokenSchema } from '@/app/modules/auth/schemas';
import type { IRefreshTokenService } from '@/app/modules/auth/services/refresh-token/RefreshTokenService.types';
import type { IController, IRequest, IResponse } from '@/app/types';
import { parseSchema } from '@/app/utils';
import {
	InvalidParameterException,
	UserNotFoundException
} from '@aws-sdk/client-cognito-identity-provider';

export class RefreshTokenController implements IController {
	constructor(private readonly refreshTokenService: IRefreshTokenService) {}

	async handle(request: IRequest): Promise<IResponse> {
		try {
			const parsedBody = parseSchema(RefreshTokenSchema, request.body);

			if (!parsedBody.success) {
				return {
					body: parsedBody.data.message,
					statusCode: parsedBody.data.statusCode
				};
			}

			const response = await this.refreshTokenService.execute(parsedBody.data);

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

			if (error instanceof InvalidParameterException) {
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

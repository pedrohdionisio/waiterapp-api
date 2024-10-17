import type { IMeService } from '@/app/modules/users/services/me/MeService.types';
import type { IController, IProtectedRequest, IResponse } from '@/app/types';
import { NotAuthorizedException } from '@aws-sdk/client-cognito-identity-provider';

export class MeController implements IController {
	constructor(private readonly meService: IMeService) {}

	async handle(request: IProtectedRequest): Promise<IResponse> {
		try {
			const response = await this.meService.execute({
				id: request.jwt.claims.sub as string
			});

			return {
				body: { ...response },
				statusCode: 200
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

import type { ISignInService } from '@/app/modules/auth/services/sign-in/SignInService.types';
import type { IController, IResponse } from '@/app/types';

export class SignInController implements IController {
	constructor(private readonly signInService: ISignInService) {}

	async handle(): Promise<IResponse> {
		await this.signInService.execute();

		return {
			statusCode: 200,
			body: {}
		};
	}
}

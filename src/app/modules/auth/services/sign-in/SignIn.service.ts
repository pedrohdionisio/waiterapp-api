import type { IAuthRepository } from '@/app/database/repositories/auth/AuthRepository.types';
import type {
	ISignInOutput,
	ISignInService,
	SignInInputType
} from './SignInService.types';

export class SignInService implements ISignInService {
	constructor(private readonly authRepository: IAuthRepository) {}

	async execute(input: SignInInputType): Promise<ISignInOutput> {
		const { accessToken, refreshToken } =
			await this.authRepository.login(input);

		return {
			accessToken,
			refreshToken
		};
	}
}

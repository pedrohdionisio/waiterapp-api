import type { IAuthRepository } from '@/app/database/repositories/auth/AuthRepository.types';
import type { ISignUpService, SignUpInputType } from './SignUpService.types';

export class SignUpService implements ISignUpService {
	constructor(private readonly authRepository: IAuthRepository) {}

	async execute(input: SignUpInputType): Promise<void> {
		await this.authRepository.create(input);
	}
}

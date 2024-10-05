import type { ISignInRepository } from '@/app/database/repositories/auth/sign-in/SignInRepository.types';
import type { ISignInService } from './SignInService.types';

export class SignInService implements ISignInService {
	constructor(private readonly signInRepository: ISignInRepository) {}

	async execute(): Promise<void> {
		this.signInRepository.create();
	}
}

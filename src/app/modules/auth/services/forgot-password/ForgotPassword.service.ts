import type { IAuthRepository } from '@/app/database/repositories/auth/AuthRepository.types';
import type {
	ForgotPasswordInputType,
	IForgotPasswordService
} from './ForgotPasswordService.types';

export class ForgotPasswordService implements IForgotPasswordService {
	constructor(private readonly authRepository: IAuthRepository) {}

	async execute(input: ForgotPasswordInputType): Promise<void> {
		await this.authRepository.forgotPassword(input);
	}
}

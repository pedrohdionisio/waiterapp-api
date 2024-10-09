import type { IAuthRepository } from '@/app/database/repositories/auth/AuthRepository.types';
import type {
	IResetPasswordService,
	ResetPasswordInputType
} from './ResetPasswordService.types';

export class ResetPasswordService implements IResetPasswordService {
	constructor(private readonly authRepository: IAuthRepository) {}

	async execute(input: ResetPasswordInputType): Promise<void> {
		await this.authRepository.resetPassword(input);
	}
}

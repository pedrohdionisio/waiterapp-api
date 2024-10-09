import { ResetPasswordService } from '@/app/modules/auth/services';
import type { IForgotPasswordService } from '@/app/modules/auth/services/forgot-password/ForgotPasswordService.types';
import { makeAuthRepository } from '@/factories/repositories/auth';

export function makeResetPasswordService(): IForgotPasswordService {
	return new ResetPasswordService(makeAuthRepository());
}

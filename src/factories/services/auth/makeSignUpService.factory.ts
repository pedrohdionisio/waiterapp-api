import { SignUpService } from '@/app/modules/auth/services';
import type { ISignUpService } from '@/app/modules/auth/services/sign-up/SignUpService.types';
import { makeAuthRepository } from '@/factories/repositories/auth';

export function makeSignUpService(): ISignUpService {
	return new SignUpService(makeAuthRepository());
}

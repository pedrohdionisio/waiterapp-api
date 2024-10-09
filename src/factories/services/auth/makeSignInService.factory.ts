import { SignInService } from '@/app/modules/auth/services';
import type { ISignInService } from '@/app/modules/auth/services/sign-in/SignInService.types';
import { makeAuthRepository } from '@/factories/repositories/auth';

export function makeSignInService(): ISignInService {
	return new SignInService(makeAuthRepository());
}

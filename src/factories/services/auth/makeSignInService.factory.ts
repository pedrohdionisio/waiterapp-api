import { SignInService } from '@/app/modules/auth/services';
import { makeAuthRepository } from '@/factories/repositories/auth';

export function makeSignInService() {
	return new SignInService(makeAuthRepository());
}

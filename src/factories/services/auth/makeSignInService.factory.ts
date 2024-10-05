import { SignInService } from '@/app/modules/auth/services';
import { makeSignInRepository } from '@/factories/repositories/auth';

export function makeSignInService() {
	return new SignInService(makeSignInRepository());
}

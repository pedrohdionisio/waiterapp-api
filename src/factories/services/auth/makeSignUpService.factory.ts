import { SignUpService } from '@/app/modules/auth/services';
import { makeAuthRepository } from '@/factories/repositories/auth';

export function makeSignUpService() {
	return new SignUpService(makeAuthRepository());
}

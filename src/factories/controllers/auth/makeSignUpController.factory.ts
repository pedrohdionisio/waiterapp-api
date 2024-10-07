import { SignUpController } from '@/app/modules/auth/controllers';
import { makeSignUpService } from '@/factories/services/auth';

export function makeSignUpController() {
	return new SignUpController(makeSignUpService());
}

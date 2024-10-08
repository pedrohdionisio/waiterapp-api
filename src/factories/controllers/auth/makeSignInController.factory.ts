import { SignInController } from '@/app/modules/auth/controllers';
import { makeSignInService } from '@/factories/services/auth';

export function makeSignInController() {
	return new SignInController(makeSignInService());
}

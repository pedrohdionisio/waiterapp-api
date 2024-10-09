import { SignInController } from '@/app/modules/auth/controllers';
import type { IController } from '@/app/types';
import { makeSignInService } from '@/factories/services/auth';

export function makeSignInController(): IController {
	return new SignInController(makeSignInService());
}

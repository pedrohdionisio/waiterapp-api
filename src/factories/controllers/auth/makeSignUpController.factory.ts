import { SignUpController } from '@/app/modules/auth/controllers';
import type { IController } from '@/app/types';
import { makeSignUpService } from '@/factories/services/auth';

export function makeSignUpController(): IController {
	return new SignUpController(makeSignUpService());
}

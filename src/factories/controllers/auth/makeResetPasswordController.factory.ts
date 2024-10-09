import { ResetPasswordController } from '@/app/modules/auth/controllers';
import type { IController } from '@/app/types';
import { makeResetPasswordService } from '@/factories/services/auth';

export function makeResetPasswordController(): IController {
	return new ResetPasswordController(makeResetPasswordService());
}

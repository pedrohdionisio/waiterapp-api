import { ForgotPasswordController } from '@/app/modules/auth/controllers';
import type { IController } from '@/app/types';
import { makeForgotPasswordService } from '@/factories/services/auth';

export function makeForgotPasswordController(): IController {
	return new ForgotPasswordController(makeForgotPasswordService());
}

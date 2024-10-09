import { AccountConfirmationController } from '@/app/modules/auth/controllers';
import type { IController } from '@/app/types';
import { makeAccountConfirmationService } from '@/factories/services/auth';

export function makeAccountConfirmationController(): IController {
	return new AccountConfirmationController(makeAccountConfirmationService());
}

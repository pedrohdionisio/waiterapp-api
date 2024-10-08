import { AccountConfirmationController } from '@/app/modules/auth/controllers';
import { makeAccountConfirmationService } from '@/factories/services/auth';

export function makeAccountConfirmationController() {
	return new AccountConfirmationController(makeAccountConfirmationService());
}

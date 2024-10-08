import { AccountConfirmationService } from '@/app/modules/auth/services';
import { makeAuthRepository } from '@/factories/repositories/auth';

export function makeAccountConfirmationService() {
	return new AccountConfirmationService(makeAuthRepository());
}

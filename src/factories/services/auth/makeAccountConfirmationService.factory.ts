import { AccountConfirmationService } from '@/app/modules/auth/services';
import type { IAccountConfirmationService } from '@/app/modules/auth/services/account-confirmation/AccountConfirmationService.types';
import { makeAuthRepository } from '@/factories/repositories/auth';

export function makeAccountConfirmationService(): IAccountConfirmationService {
	return new AccountConfirmationService(makeAuthRepository());
}

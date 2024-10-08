import type { IAuthRepository } from '@/app/database/repositories/auth/AuthRepository.types';
import type {
	AccountConfirmationInputType,
	IAccountConfirmationService
} from './AccountConfirmationService.types';

export class AccountConfirmationService implements IAccountConfirmationService {
	constructor(private readonly authRepository: IAuthRepository) {}

	async execute(input: AccountConfirmationInputType): Promise<void> {
		await this.authRepository.confirmAccount(input);
	}
}

import { MeService } from '@/app/modules/users/services';
import type { IMeService } from '@/app/modules/users/services/me/MeService.types';
import { makeUsersRepository } from '@/factories/repositories/users';

export function makeMeService(): IMeService {
	return new MeService(makeUsersRepository());
}

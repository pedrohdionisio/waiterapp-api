import { UpdateUserService } from '@/app/modules/users/services';
import type { IUpdateUserService } from '@/app/modules/users/services/update-user/UpdateUserService.types';
import { makeUsersRepository } from '@/factories/repositories/users';

export function makeUpdateUserService(): IUpdateUserService {
	return new UpdateUserService(makeUsersRepository());
}

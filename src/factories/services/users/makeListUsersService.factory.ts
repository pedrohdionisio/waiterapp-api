import { ListUsersService } from '@/app/modules/users/services';
import type { IListUsersService } from '@/app/modules/users/services/list-users/ListUsersService.types';
import { makeUsersRepository } from '@/factories/repositories/users';

export function makeListUsersService(): IListUsersService {
	return new ListUsersService(makeUsersRepository());
}

import { DeleteUserService } from '@/app/modules/users/services';
import type { IDeleteUserService } from '@/app/modules/users/services/delete-user/DeleteUserService.types';
import { makeUsersRepository } from '@/factories/repositories/users';

export function makeDeleteUserService(): IDeleteUserService {
	return new DeleteUserService(makeUsersRepository());
}

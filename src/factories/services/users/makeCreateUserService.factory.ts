import { CreateUserService } from '@/app/modules/users/services';
import type { ICreateUserService } from '@/app/modules/users/services/create-user/CreateUserService.types';
import { makeUsersRepository } from '@/factories/repositories/users';

export function makeCreateUserService(): ICreateUserService {
	return new CreateUserService(makeUsersRepository());
}

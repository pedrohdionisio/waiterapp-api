import { ListUsersController } from '@/app/modules/users/controllers';
import type { IController } from '@/app/types';
import { makeListUsersService } from '@/factories/services/users';

export function makeListUsersController(): IController {
	return new ListUsersController(makeListUsersService());
}

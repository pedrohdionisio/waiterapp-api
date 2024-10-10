import { DeleteUserController } from '@/app/modules/users/controllers';
import type { IController } from '@/app/types';
import { makeDeleteUserService } from '@/factories/services/users';

export function makeDeleteUserController(): IController {
	return new DeleteUserController(makeDeleteUserService());
}

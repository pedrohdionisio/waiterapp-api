import { UpdateUserController } from '@/app/modules/users/controllers';
import type { IController } from '@/app/types';
import { makeUpdateUserService } from '@/factories/services/users';

export function makeUpdateUserController(): IController {
	return new UpdateUserController(makeUpdateUserService());
}

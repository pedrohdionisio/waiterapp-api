import { CreateUserController } from '@/app/modules/users/controllers';
import type { IController } from '@/app/types';
import { makeCreateUserService } from '@/factories/services/users';

export function makeCreateUserController(): IController {
	return new CreateUserController(makeCreateUserService());
}

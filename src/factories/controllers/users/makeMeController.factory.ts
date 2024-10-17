import { MeController } from '@/app/modules/users/controllers';
import type { IController } from '@/app/types';
import { makeMeService } from '@/factories/services/users';

export function makeMeController(): IController {
	return new MeController(makeMeService());
}

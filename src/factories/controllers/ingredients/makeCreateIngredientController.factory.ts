import { CreateIngredientController } from '@/app/modules/ingredients/controllers';
import type { IController } from '@/app/types';
import { makeCreateIngredientService } from '@/factories/services/ingredients/makeCreateIngredientService.factory';

export function makeCreateIngredientController(): IController {
	return new CreateIngredientController(makeCreateIngredientService());
}

import { UpdateIngredientController } from '@/app/modules/ingredients/controllers';
import type { IController } from '@/app/types';
import { makeUpdateIngredientService } from '@/factories/services/ingredients';

export function makeUpdateIngredientController(): IController {
	return new UpdateIngredientController(makeUpdateIngredientService());
}

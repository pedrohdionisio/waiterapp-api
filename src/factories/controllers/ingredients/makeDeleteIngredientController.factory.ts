import { DeleteIngredientController } from '@/app/modules/ingredients/controllers';
import type { IController } from '@/app/types';
import { makeDeleteIngredientService } from '@/factories/services/ingredients';

export function makeDeleteIngredientController(): IController {
	return new DeleteIngredientController(makeDeleteIngredientService());
}

import { UpdateIngredientService } from '@/app/modules/ingredients/services';
import type { IUpdateIngredientService } from '@/app/modules/ingredients/services/update-ingredient/UpdateIngredientService.types';
import { makeIngredientsRepository } from '@/factories/repositories/ingredients';

export function makeUpdateIngredientService(): IUpdateIngredientService {
	return new UpdateIngredientService(makeIngredientsRepository());
}

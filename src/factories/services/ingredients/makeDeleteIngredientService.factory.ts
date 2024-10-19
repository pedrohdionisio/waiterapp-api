import { DeleteIngredientService } from '@/app/modules/ingredients/services';
import type { IDeleteIngredientService } from '@/app/modules/ingredients/services/delete-ingredient/DeleteIngredientService.types';
import { makeIngredientsRepository } from '@/factories/repositories/ingredients';

export function makeDeleteIngredientService(): IDeleteIngredientService {
	return new DeleteIngredientService(makeIngredientsRepository());
}

import { CreateIngredientService } from '@/app/modules/ingredients/services';
import type { ICreateIngredientService } from '@/app/modules/ingredients/services/create-ingredient/CreateIngredientService.types';
import { makeIngredientsRepository } from '@/factories/repositories/ingredients';

export function makeCreateIngredientService(): ICreateIngredientService {
	return new CreateIngredientService(makeIngredientsRepository());
}

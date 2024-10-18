import { ListIngredientsService } from '@/app/modules/ingredients/services';
import type { IListIngredientsService } from '@/app/modules/ingredients/services/list-ingredients/ListIngredientsService.types';
import { makeIngredientsRepository } from '@/factories/repositories/ingredients';

export function makeListIngredientsService(): IListIngredientsService {
	return new ListIngredientsService(makeIngredientsRepository());
}

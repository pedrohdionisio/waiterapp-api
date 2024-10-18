import { ListIngredientsController } from '@/app/modules/ingredients/controllers';
import type { IController } from '@/app/types';
import { makeListIngredientsService } from '@/factories/services/ingredients';

export function makeListIngredientsController(): IController {
	return new ListIngredientsController(makeListIngredientsService());
}

import { IngredientsRepository } from '@/app/database/repositories/ingredients';
import type { IIngredientsRepository } from '@/app/database/repositories/ingredients/IngredientsRepository.types';
import { dynamoClient } from '@/app/libs';

export function makeIngredientsRepository(): IIngredientsRepository {
	return new IngredientsRepository(dynamoClient);
}

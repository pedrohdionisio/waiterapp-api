import type { IIngredientsRepository } from '@/app/database/repositories/ingredients/IngredientsRepository.types';
import type { IIngredient } from '@/app/entities';
import type { IListIngredientsService } from './ListIngredientsService.types';

export class ListIngredientsService implements IListIngredientsService {
	constructor(private readonly ingredientsRepository: IIngredientsRepository) {}

	async execute(): Promise<IIngredient[]> {
		const ingredients = await this.ingredientsRepository.list();

		return ingredients;
	}
}

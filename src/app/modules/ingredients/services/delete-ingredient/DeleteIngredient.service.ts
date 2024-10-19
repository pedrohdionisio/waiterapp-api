import type { IIngredientsRepository } from '@/app/database/repositories/ingredients/IngredientsRepository.types';
import type {
	DeleteIngredientInputType,
	IDeleteIngredientService
} from './DeleteIngredientService.types';

export class DeleteIngredientService implements IDeleteIngredientService {
	constructor(private readonly ingredientsRepository: IIngredientsRepository) {}

	async execute(input: DeleteIngredientInputType): Promise<void> {
		await this.ingredientsRepository.delete(input);
	}
}

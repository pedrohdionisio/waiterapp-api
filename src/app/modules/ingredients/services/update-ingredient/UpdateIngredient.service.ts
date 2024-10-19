import type { IIngredientsRepository } from '@/app/database/repositories/ingredients/IngredientsRepository.types';
import type {
	IUpdateIngredientService,
	UpdateIngredientInputType
} from './UpdateIngredientService.types';

export class UpdateIngredientService implements IUpdateIngredientService {
	constructor(private readonly ingredientsRepository: IIngredientsRepository) {}

	async execute(input: UpdateIngredientInputType): Promise<void> {
		await this.ingredientsRepository.update(input);
	}
}

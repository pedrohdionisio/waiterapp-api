import type { IIngredientsRepository } from '@/app/database/repositories/ingredients/IngredientsRepository.types';
import type {
	CreateIngredientInputType,
	ICreateIngredientService
} from './CreateIngredientService.types';

export class CreateIngredientService implements ICreateIngredientService {
	constructor(private readonly ingredientsRepository: IIngredientsRepository) {}

	async execute(input: CreateIngredientInputType): Promise<void> {
		await this.ingredientsRepository.create(input);
	}
}

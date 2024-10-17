import type { CreateIngredientSchema } from '@/app/modules/ingredients/schemas';
import type { z } from 'zod';

export type CreateIngredientInputType = z.infer<typeof CreateIngredientSchema>;

export interface ICreateIngredientService {
	execute(input: CreateIngredientInputType): Promise<void>;
}

import type { UpdateIngredientSchema } from '@/app/modules/ingredients/schemas';
import type { z } from 'zod';

export type UpdateIngredientInputType = z.infer<
	typeof UpdateIngredientSchema
> & {
	id: string;
};

export interface IUpdateIngredientService {
	execute(input: UpdateIngredientInputType): Promise<void>;
}

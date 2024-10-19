import type { DeleteIngredientSchema } from '@/app/modules/ingredients/schemas';
import type { z } from 'zod';

export type DeleteIngredientInputType = z.infer<typeof DeleteIngredientSchema>;

export interface IDeleteIngredientService {
	execute(input: DeleteIngredientInputType): Promise<void>;
}

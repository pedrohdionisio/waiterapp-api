import { z } from 'zod';

export const DeleteIngredientSchema = z.object({
	name: z.string()
});

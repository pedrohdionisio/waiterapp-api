import { z } from 'zod';

export const UpdateIngredientSchema = z.object({
	name: z.string(),
	icon: z.string()
});

import { z } from 'zod';

export const CreateIngredientSchema = z.object({
	name: z.string(),
	icon: z.string()
});

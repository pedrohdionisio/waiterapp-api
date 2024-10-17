import { z } from 'zod';

export const MeSchema = z.object({
	email: z.string().email()
});

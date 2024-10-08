import { z } from 'zod';

export const SignInSchema = z.object({
	email: z.string().email({ message: 'Invalid e-mail format' }),
	password: z.string().min(8)
});

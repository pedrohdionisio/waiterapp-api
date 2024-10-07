import { z } from 'zod';

export const SignUpSchema = z.object({
	name: z.string(),
	email: z.string().email({ message: 'Invalid e-mail format' }),
	password: z.string().min(8),
	role: z.enum(['ADMIN', 'WAITER', 'CHEF'])
});

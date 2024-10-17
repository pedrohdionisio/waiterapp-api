import { z } from 'zod';

export const UpdateUserSchema = z.object({
	name: z.string(),
	email: z.string().email({ message: 'Invalid e-mail format' }),
	role: z.enum(['ADMIN', 'WAITER', 'CHEF'])
});

import { z } from 'zod';

export const ResetPasswordSchema = z.object({
	email: z.string().email({ message: 'Invalid e-mail format' }),
	code: z.string().min(0).max(6),
	newPassword: z.string()
});

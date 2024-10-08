import { z } from 'zod';

export const AccountConfirmationSchema = z.object({
	email: z.string().email({ message: 'Invalid e-mail format' }),
	code: z.string().min(0).max(6)
});

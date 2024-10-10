import { z } from 'zod';

export const DeleteUserSchema = z.object({
	userId: z.string(),
	email: z.string().email()
});

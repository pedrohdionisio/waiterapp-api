import type { ForgotPasswordSchema } from '@/app/modules/auth/schemas';
import type { z } from 'zod';

export type ForgotPasswordInputType = z.infer<typeof ForgotPasswordSchema>;

export interface IForgotPasswordService {
	execute(input: ForgotPasswordInputType): Promise<void>;
}

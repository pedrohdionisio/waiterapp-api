import type { ResetPasswordSchema } from '@/app/modules/auth/schemas';
import type { z } from 'zod';

export type ResetPasswordInputType = z.infer<typeof ResetPasswordSchema>;

export interface IResetPasswordService {
	execute(input: ResetPasswordInputType): Promise<void>;
}

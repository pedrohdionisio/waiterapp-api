import type { SignUpSchema } from '@/app/modules/auth/schemas';
import type { z } from 'zod';

export type SignUpInputType = z.infer<typeof SignUpSchema>;

export interface ISignUpService {
	execute(input: SignUpInputType): Promise<void>;
}

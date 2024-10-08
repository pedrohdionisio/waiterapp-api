import type { SignInSchema } from '@/app/modules/auth/schemas';
import type { z } from 'zod';

export type SignInInputType = z.infer<typeof SignInSchema>;

export interface ISignInOutput {
	accessToken?: string;
	refreshToken?: string;
}

export interface ISignInService {
	execute(input: SignInInputType): Promise<ISignInOutput>;
}

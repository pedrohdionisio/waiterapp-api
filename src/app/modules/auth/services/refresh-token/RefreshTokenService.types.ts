import type { RefreshTokenSchema } from '@/app/modules/auth/schemas';
import type { z } from 'zod';

export type RefreshTokenInputType = z.infer<typeof RefreshTokenSchema>;

export interface IRefreshTokenOutput {
	accessToken?: string;
}

export interface IRefreshTokenService {
	execute(input: RefreshTokenInputType): Promise<IRefreshTokenOutput>;
}

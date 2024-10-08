import type { AccountConfirmationSchema } from '@/app/modules/auth/schemas';
import type { z } from 'zod';

export type AccountConfirmationInputType = z.infer<
	typeof AccountConfirmationSchema
>;

export interface IAccountConfirmationService {
	execute(input: AccountConfirmationInputType): Promise<void>;
}

import type { CreateUserSchema } from '@/app/modules/users/schemas';
import type { z } from 'zod';

export type CreateUserInputType = z.infer<typeof CreateUserSchema>;

export interface ICreateUserService {
	execute(input: CreateUserInputType): Promise<void>;
}

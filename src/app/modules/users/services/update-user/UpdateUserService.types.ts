import type { UpdateUserSchema } from '@/app/modules/users/schemas';
import type { z } from 'zod';

export type UpdateUserInputType = z.infer<typeof UpdateUserSchema> & {
	id: string;
};

export interface IUpdateUserService {
	execute(input: UpdateUserInputType): Promise<void>;
}

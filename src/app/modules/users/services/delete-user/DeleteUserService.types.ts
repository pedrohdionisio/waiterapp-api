import type { DeleteUserSchema } from '@/app/modules/users/schemas';
import type { z } from 'zod';

export type DeleteUserInputType = z.infer<typeof DeleteUserSchema>;

export interface IDeleteUserService {
	execute(input: DeleteUserInputType): Promise<void>;
}

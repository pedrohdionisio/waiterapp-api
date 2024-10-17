import type { IUsersRepository } from '@/app/database/repositories/users/UsersRepository.types';
import { AppError } from '@/app/errors';
import type {
	IUpdateUserService,
	UpdateUserInputType
} from './UpdateUserService.types';

export class UpdateUserService implements IUpdateUserService {
	constructor(private readonly usersRepository: IUsersRepository) {}

	async execute(input: UpdateUserInputType): Promise<void> {
		const user = await this.usersRepository.getUserById({ id: input.id });

		if (!user) {
			throw new AppError('User not found.', 404);
		}

		await this.usersRepository.update(input);
	}
}

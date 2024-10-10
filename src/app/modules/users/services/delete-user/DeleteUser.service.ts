import type { IUsersRepository } from '@/app/database/repositories/users/UsersRepository.types';
import type {
	DeleteUserInputType,
	IDeleteUserService
} from './DeleteUserService.types';

export class DeleteUserService implements IDeleteUserService {
	constructor(private readonly usersRepository: IUsersRepository) {}

	async execute(input: DeleteUserInputType): Promise<void> {
		await this.usersRepository.delete(input);
	}
}

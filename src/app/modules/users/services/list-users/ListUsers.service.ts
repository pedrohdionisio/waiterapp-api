import type { IUsersRepository } from '@/app/database/repositories/users/UsersRepository.types';
import type { IUser } from '@/app/entities';
import type { IListUsersService } from './ListUsersService.types';

export class ListUsersService implements IListUsersService {
	constructor(private readonly usersRepository: IUsersRepository) {}

	async execute(): Promise<IUser[]> {
		const response = await this.usersRepository.list();

		return response;
	}
}

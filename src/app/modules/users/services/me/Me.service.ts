import type { IUsersRepository } from '@/app/database/repositories/users/UsersRepository.types';
import type { IUser } from '@/app/entities';
import type { IMeService, MeServiceInputType } from './MeService.types';

export class MeService implements IMeService {
	constructor(private readonly usersRepository: IUsersRepository) {}

	async execute(input: MeServiceInputType): Promise<IUser> {
		const response = await this.usersRepository.getLoggedUser(input);

		return response;
	}
}

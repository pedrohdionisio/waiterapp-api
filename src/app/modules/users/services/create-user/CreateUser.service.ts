import type { IUsersRepository } from '@/app/database/repositories/users/UsersRepository.types';
import type {
	CreateUserInputType,
	ICreateUserService
} from './CreateUserService.types';

export class CreateUserService implements ICreateUserService {
	constructor(private readonly authRepository: IUsersRepository) {}

	async execute(input: CreateUserInputType): Promise<void> {
		await this.authRepository.create(input);
	}
}

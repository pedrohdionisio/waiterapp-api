import { UsersRepository } from '@/app/database/repositories/users';
import type { IUsersRepository } from '@/app/database/repositories/users/UsersRepository.types';
import { cognitoClient, dynamoClient } from '@/app/libs';

export function makeUsersRepository(): IUsersRepository {
	return new UsersRepository(cognitoClient, dynamoClient);
}

import { AuthRepository } from '@/app/database/repositories/auth';
import type { IAuthRepository } from '@/app/database/repositories/auth/AuthRepository.types';
import { cognitoClient, dynamoClient } from '@/app/libs';

export function makeAuthRepository(): IAuthRepository {
	return new AuthRepository(cognitoClient, dynamoClient);
}

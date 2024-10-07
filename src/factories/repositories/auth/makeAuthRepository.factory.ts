import { AuthRepository } from '@/app/database/repositories/auth';
import { cognitoClient } from '@/app/libs';

export function makeAuthRepository() {
	return new AuthRepository(cognitoClient);
}

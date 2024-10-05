import { SignInRepository } from '@/app/database/repositories/auth/sign-in/SignIn.repository';
import { cognitoClient } from '@/app/libs/cognitoClient';

export function makeSignInRepository() {
	return new SignInRepository(cognitoClient);
}

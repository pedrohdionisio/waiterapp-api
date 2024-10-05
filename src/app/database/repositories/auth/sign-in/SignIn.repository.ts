import type { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import type { ISignInRepository } from './SignInRepository.types';

export class SignInRepository implements ISignInRepository {
	constructor(private readonly cognitoClient: CognitoIdentityProviderClient) {}

	async create() {
		this.cognitoClient.destroy();
	}
}

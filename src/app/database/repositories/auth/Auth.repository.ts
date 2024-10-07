import {
	type CognitoIdentityProviderClient,
	SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider';
import type {
	IAuthRepository,
	ICreateUserDTO,
	ICreateUserReturn
} from './AuthRepository.types';

export class AuthRepository implements IAuthRepository {
	constructor(private readonly cognitoClient: CognitoIdentityProviderClient) {}

	async create(dto: ICreateUserDTO): Promise<ICreateUserReturn> {
		const command = new SignUpCommand({
			ClientId: process.env.COGNITO_CLIENT_ID,
			Username: dto.email,
			Password: dto.password,
			UserAttributes: [
				{
					Name: 'name',
					Value: dto.name
				},
				{
					Name: 'custom:role',
					Value: dto.role
				}
			]
		});

		const { UserSub } = await this.cognitoClient.send(command);

		return {
			id: UserSub
		};
	}
}

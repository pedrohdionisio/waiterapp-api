import type { IAuthRepository } from '@/app/database/repositories/auth/AuthRepository.types';
import type {
	ISignUpInput,
	ISignUpOutput,
	ISignUpService
} from './SignUpService.types';

export class SignUpService implements ISignUpService {
	constructor(private readonly authRepository: IAuthRepository) {}

	async execute(input: ISignUpInput): Promise<ISignUpOutput> {
		const { id } = await this.authRepository.create(input);

		return {
			...input,
			id
		};
	}
}

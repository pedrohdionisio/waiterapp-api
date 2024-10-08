import type { IAuthRepository } from '@/app/database/repositories/auth/AuthRepository.types';
import type {
	ISignUpOutput,
	ISignUpService,
	SignUpInputType
} from './SignUpService.types';

export class SignUpService implements ISignUpService {
	constructor(private readonly authRepository: IAuthRepository) {}

	async execute(input: SignUpInputType): Promise<ISignUpOutput> {
		const { id } = await this.authRepository.create(input);

		return {
			...input,
			id
		};
	}
}

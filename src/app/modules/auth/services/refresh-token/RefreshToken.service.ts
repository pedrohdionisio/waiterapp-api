import type { IAuthRepository } from '@/app/database/repositories/auth/AuthRepository.types';
import type {
	IRefreshTokenOutput,
	IRefreshTokenService,
	RefreshTokenInputType
} from './RefreshTokenService.types';

export class RefreshTokenService implements IRefreshTokenService {
	constructor(private readonly authRepository: IAuthRepository) {}

	async execute(input: RefreshTokenInputType): Promise<IRefreshTokenOutput> {
		const { accessToken } = await this.authRepository.refreshToken(input);

		return {
			accessToken
		};
	}
}

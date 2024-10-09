import { RefreshTokenService } from '@/app/modules/auth/services';
import type { IRefreshTokenService } from '@/app/modules/auth/services/refresh-token/RefreshTokenService.types';
import { makeAuthRepository } from '@/factories/repositories/auth';

export function makeRefreshTokenService(): IRefreshTokenService {
	return new RefreshTokenService(makeAuthRepository());
}

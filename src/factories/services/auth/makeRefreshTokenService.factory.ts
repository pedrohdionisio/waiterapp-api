import { RefreshTokenService } from '@/app/modules/auth/services';
import { makeAuthRepository } from '@/factories/repositories/auth';

export function makeRefreshTokenService() {
	return new RefreshTokenService(makeAuthRepository());
}

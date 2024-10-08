import { RefreshTokenController } from '@/app/modules/auth/controllers';
import { makeRefreshTokenService } from '@/factories/services/auth';

export function makeRefreshTokenController() {
	return new RefreshTokenController(makeRefreshTokenService());
}

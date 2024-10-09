import { RefreshTokenController } from '@/app/modules/auth/controllers';
import type { IController } from '@/app/types';
import { makeRefreshTokenService } from '@/factories/services/auth';

export function makeRefreshTokenController(): IController {
	return new RefreshTokenController(makeRefreshTokenService());
}

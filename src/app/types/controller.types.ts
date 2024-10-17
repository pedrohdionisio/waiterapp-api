import type { IProtectedRequest, IPublicRequest, IResponse } from './';

export interface IController {
	handle(request: IPublicRequest | IProtectedRequest): Promise<IResponse>;
}

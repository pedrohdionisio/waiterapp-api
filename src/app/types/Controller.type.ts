import type { IRequest, IResponse } from './';

export interface IController {
	handle(request: IRequest): Promise<IResponse>;
}

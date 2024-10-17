export interface IRequest {
	body: Record<string, unknown>;
	params: Record<string, unknown>;
	headers: Record<string, string | undefined>;
	queryParams: Record<string, string | undefined>;
}

export interface IPublicRequest extends IRequest {}

export interface IProtectedRequest extends IRequest {
	jwt: {
		claims: {
			[name: string]: string | number | boolean | string[];
		};
		scopes: string[];
	};
}

export interface IResponse {
	statusCode: number;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	body: Record<string, any> | null;
}

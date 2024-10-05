export interface IRequest {
	body: Record<string, unknown>;
	params: Record<string, unknown>;
	headers: Record<string, string | undefined>;
	queryParams: Record<string, string | undefined>;
}

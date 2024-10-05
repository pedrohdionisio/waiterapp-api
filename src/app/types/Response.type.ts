export interface IResponse {
	statusCode: number;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	body: Record<string, any> | null;
}

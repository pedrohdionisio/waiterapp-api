import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export interface ILambdaResponse {
	statusCode: number;
	body: string;
	headers: Record<string, unknown>;
}

export type LambdaHandlerType = (
	event: APIGatewayProxyEventV2
) => Promise<ILambdaResponse>;

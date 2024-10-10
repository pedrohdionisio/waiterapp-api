import type { IRequest } from '@/app/types';
import type {
	APIGatewayProxyEventV2,
	APIGatewayProxyEventV2WithJWTAuthorizer
} from 'aws-lambda';

export function requestAdapter(
	event: APIGatewayProxyEventV2 | APIGatewayProxyEventV2WithJWTAuthorizer
): IRequest {
	const request = {
		body: JSON.parse(event.body || '{}'),
		params: event.pathParameters || {},
		headers: event.headers,
		queryParams: event.queryStringParameters || {}
	};

	return request;
}

import type { IPublicRequest } from '@/app/types';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export function publicRequestAdapter(
	event: APIGatewayProxyEventV2
): IPublicRequest {
	const request = {
		body: JSON.parse(event.body || '{}'),
		params: event.pathParameters || {},
		headers: event.headers,
		queryParams: event.queryStringParameters || {}
	};

	return request;
}

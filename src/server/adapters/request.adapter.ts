import type { IRequest } from '@/app/types';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export function requestAdapter(event: APIGatewayProxyEventV2): IRequest {
	const request = {
		body: JSON.parse(event.body || '{}'),
		params: event.pathParameters || {},
		headers: event.headers,
		queryParams: event.queryStringParameters || {}
	};

	return request;
}

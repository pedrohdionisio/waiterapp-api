import type { IProtectedRequest } from '@/app/types';
import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

export function protectedRequestAdapter(
	event: APIGatewayProxyEventV2WithJWTAuthorizer
): IProtectedRequest {
	const request = {
		body: JSON.parse(event.body || '{}'),
		params: event.pathParameters || {},
		headers: event.headers,
		queryParams: event.queryStringParameters || {},
		jwt: event.requestContext.authorizer.jwt
	};

	return request;
}

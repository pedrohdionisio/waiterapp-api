import { makeListUsersController } from '@/factories/controllers/users';
import {
	type ILambdaResponse,
	requestAdapter,
	responseAdapter
} from '@/server/adapters';
import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

export async function handler(
	event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<ILambdaResponse> {
	const controller = makeListUsersController();

	const response = await controller.handle(requestAdapter(event));

	return responseAdapter(response);
}

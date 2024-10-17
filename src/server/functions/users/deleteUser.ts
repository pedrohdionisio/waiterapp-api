import { makeDeleteUserController } from '@/factories/controllers/users';
import {
	type ILambdaResponse,
	protectedRequestAdapter,
	responseAdapter
} from '@/server/adapters';
import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

export async function handler(
	event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<ILambdaResponse> {
	const controller = makeDeleteUserController();

	const response = await controller.handle(protectedRequestAdapter(event));

	return responseAdapter(response);
}

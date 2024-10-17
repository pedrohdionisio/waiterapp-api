import { makeAccountConfirmationController } from '@/factories/controllers/auth';
import {
	type ILambdaResponse,
	requestAdapter,
	responseAdapter
} from '@/server/adapters';
import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

export async function handler(
	event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<ILambdaResponse> {
	const controller = makeAccountConfirmationController();

	const response = await controller.handle(requestAdapter(event));

	return responseAdapter(response);
}

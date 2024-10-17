import { makeResetPasswordController } from '@/factories/controllers/auth';
import {
	type ILambdaResponse,
	publicRequestAdapter,
	responseAdapter
} from '@/server/adapters';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(
	event: APIGatewayProxyEventV2
): Promise<ILambdaResponse> {
	const controller = makeResetPasswordController();

	const response = await controller.handle(publicRequestAdapter(event));

	return responseAdapter(response);
}

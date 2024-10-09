import { makeForgotPasswordController } from '@/factories/controllers/auth';
import {
	type ILambdaResponse,
	requestAdapter,
	responseAdapter
} from '@/server/adapters';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(
	event: APIGatewayProxyEventV2
): Promise<ILambdaResponse> {
	const controller = makeForgotPasswordController();

	const response = await controller.handle(requestAdapter(event));

	return responseAdapter(response);
}

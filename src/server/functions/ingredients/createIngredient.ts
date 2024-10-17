import { makeCreateIngredientController } from '@/factories/controllers/ingredients';
import {
	type ILambdaResponse,
	protectedRequestAdapter,
	responseAdapter
} from '@/server/adapters';
import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

export async function handler(
	event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<ILambdaResponse> {
	const controller = makeCreateIngredientController();

	const response = await controller.handle(protectedRequestAdapter(event));

	return responseAdapter(response);
}

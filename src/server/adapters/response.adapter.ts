import type { IResponse } from '@/app/types';
import type { ILambdaResponse } from './';

export function responseAdapter(response: IResponse): ILambdaResponse {
	return {
		statusCode: response.statusCode,
		body: JSON.stringify(response.body),
		headers: {
			'Access-Control-Allow-Origin': 'https://godiet.com.br',
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Methods': 'POST,PATCH,PUT,DELETE,GET,OPTIONS,HEAD'
		}
	};
}

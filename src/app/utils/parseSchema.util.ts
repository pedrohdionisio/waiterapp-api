import type { z } from 'zod';
import { ZodError } from '../errors';
import type { ReturnErrorMissingFieldOutputUnionType } from './utils.types';

export function parseSchema<S extends z.ZodType>(
	schema: S,
	body: unknown
): ReturnErrorMissingFieldOutputUnionType<S> {
	const result = schema.safeParse(body);

	if (!result.success) {
		const error = new ZodError(result.error);

		return {
			success: false,
			data: error
		};
	}

	return {
		success: true,
		data: result.data
	};
}

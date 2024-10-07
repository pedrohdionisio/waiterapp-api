import type * as z from 'zod';
import type { ZodError } from '../errors';

interface IReturnErrorMissingFieldOutput<S extends z.ZodType> {
	success: true;
	data: S extends z.ZodType<infer T> ? z.SafeParseSuccess<T>['data'] : never;
}

interface IReturnErrorMissingFieldOutputFalse {
	success: false;
	data: ZodError;
}

export type ReturnErrorMissingFieldOutputUnionType<S extends z.ZodType> =
	| IReturnErrorMissingFieldOutput<S>
	| IReturnErrorMissingFieldOutputFalse;

import { prefixes } from '../constants';

export function addPrefix(prefix: string, value: string): string {
	return `${prefixes[prefix]}${value}`;
}

import type { IUser } from '@/app/entities';

export type MeServiceInputType = {
	id: string;
};

export interface IMeService {
	execute(input: MeServiceInputType): Promise<IUser>;
}

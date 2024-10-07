import type { UserRoleType } from '@/app/entities';

export interface ISignUpInput {
	name: string;
	email: string;
	password: string;
	role: UserRoleType;
}

export interface ISignUpOutput {
	id?: string;
	name: string;
	email: string;
	password: string;
}

export interface ISignUpService {
	execute(input: ISignUpInput): Promise<ISignUpOutput>;
}

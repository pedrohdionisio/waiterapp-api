import type { UserRoleType } from '@/app/entities';

export interface ICreateUserDTO {
	name: string;
	email: string;
	password: string;
	role: UserRoleType;
}

export interface ICreateUserReturn {
	id?: string;
}

export interface IAuthRepository {
	create(dto: ICreateUserDTO): Promise<ICreateUserReturn>;
}

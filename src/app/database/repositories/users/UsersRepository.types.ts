import type { UserRoleType } from '@/app/entities';

export interface ICreateUserDTO {
	name: string;
	email: string;
	password: string;
	role: UserRoleType;
}

export interface IUsersRepository {
	create(dto: ICreateUserDTO): Promise<void>;
}

import type { IUser, UserRoleType } from '@/app/entities';

export interface ICreateUserDTO {
	name: string;
	email: string;
	password: string;
	role: UserRoleType;
}

export interface IDeleteUserDTO {
	email: string;
	userId: string;
}

export interface IUsersRepository {
	create(dto: ICreateUserDTO): Promise<void>;
	delete(dto: IDeleteUserDTO): Promise<void>;
	list(): Promise<IUser[]>;
}

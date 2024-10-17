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

export interface IUpdateUserDTO {
	id: string;
	name: string;
	email: string;
	role: UserRoleType;
}

export interface IGetUserByIdDTO {
	id: string;
}

export interface IGetLoggedUserDTO {
	id: string;
}

export interface IUsersRepository {
	create(dto: ICreateUserDTO): Promise<void>;
	delete(dto: IDeleteUserDTO): Promise<void>;
	list(): Promise<IUser[]>;
	getUserById(dto: IGetUserByIdDTO): Promise<IUser>;
	getLoggedUser(dto: IGetLoggedUserDTO): Promise<IUser>;
	update(dto: IUpdateUserDTO): Promise<void>;
}

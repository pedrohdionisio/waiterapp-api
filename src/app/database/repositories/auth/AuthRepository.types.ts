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

export interface IConfirmAccountDTO {
	email: string;
	code: string;
}

export interface ILoginDTO {
	email: string;
	password: string;
}

export interface ILoginReturn {
	accessToken?: string;
	refreshToken?: string;
}

export interface IRefreshTokenDTO {
	refreshToken: string;
}

export interface IRefreshTokenReturn {
	accessToken?: string;
}
export interface IAuthRepository {
	create(dto: ICreateUserDTO): Promise<ICreateUserReturn>;
	confirmAccount(dto: IConfirmAccountDTO): Promise<void>;
	login(dto: ILoginDTO): Promise<ILoginReturn>;
	refreshToken(dto: IRefreshTokenDTO): Promise<IRefreshTokenReturn>;
}

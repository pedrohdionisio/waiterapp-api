export type UserRoleType = 'ADMIN' | 'WAITER' | 'CHEF';

export interface IUser {
	id: string;
	name: string;
	password: string;
	email: string;
	role: UserRoleType;
	externalId: string;
}

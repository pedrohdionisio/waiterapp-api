export type UserRoleType = 'ADMIN' | 'WAITER' | 'CHEF';

export interface IUser {
	id: string;
	name: string;
	email: string;
	role: UserRoleType;
	externalId: string;
	password?: string;
}

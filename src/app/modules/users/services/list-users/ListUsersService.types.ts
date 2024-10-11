import type { IUser } from '@/app/entities';

export interface IListUsersService {
	execute(): Promise<IUser[]>;
}

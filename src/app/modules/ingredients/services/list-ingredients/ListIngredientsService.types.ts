import type { IIngredient } from '@/app/entities';

export interface IListIngredientsService {
	execute(): Promise<IIngredient[]>;
}

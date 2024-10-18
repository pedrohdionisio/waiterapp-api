import type { IIngredient } from '@/app/entities';

export interface ICreateIngredientDTO {
	name: string;
	icon: string;
}

export interface IIngredientsRepository {
	create(dto: ICreateIngredientDTO): Promise<void>;
	list(): Promise<IIngredient[]>;
}

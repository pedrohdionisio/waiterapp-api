import type { IIngredient } from '@/app/entities';

export interface ICreateIngredientDTO {
	name: string;
	icon: string;
}

export interface IDeleteIngredientDTO {
	name: string;
}

export interface IIngredientsRepository {
	create(dto: ICreateIngredientDTO): Promise<void>;
	list(): Promise<IIngredient[]>;
	delete(dto: IDeleteIngredientDTO): Promise<void>;
}

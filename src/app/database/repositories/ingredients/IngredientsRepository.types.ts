import type { IIngredient } from '@/app/entities';

export interface ICreateIngredientDTO {
	name: string;
	icon: string;
}

export interface IUpdateIngredientDTO {
	id: string;
	name: string;
	icon: string;
}

export interface IDeleteIngredientDTO {
	name: string;
}

export interface IGetIngredientByIdDTO {
	id: string;
}

export interface IIngredientsRepository {
	create(dto: ICreateIngredientDTO): Promise<void>;
	list(): Promise<IIngredient[]>;
	delete(dto: IDeleteIngredientDTO): Promise<void>;
	update(dto: IUpdateIngredientDTO): Promise<void>;
	getIngredientById(dto: IGetIngredientByIdDTO): Promise<IIngredient>;
}

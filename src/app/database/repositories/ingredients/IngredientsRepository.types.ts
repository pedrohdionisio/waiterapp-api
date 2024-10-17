export interface ICreateIngredientDTO {
	name: string;
	icon: string;
}

export interface IIngredientsRepository {
	create(dto: ICreateIngredientDTO): Promise<void>;
}

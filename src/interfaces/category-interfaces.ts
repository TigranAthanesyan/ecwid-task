export interface ICategory {
	id: number;
	imageUrl: string;
	name: string;
};

export type CategoriesDTO = {
	total: number;
	count: number;
	offset: number;
	limit: number;
	items: ICategory[];
};
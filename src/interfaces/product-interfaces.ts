export interface IProduct {
	id: number;
	name: string;
	description: string;
	price: number;
	defaultDisplayedPriceFormatted: string;
	imageUrl: string;
	categoryIds: number[];
}

export type ProductsDTO = {
	total: number;
	count: number;
	offset: number;
	limit: number;
	items: IProduct[];
}
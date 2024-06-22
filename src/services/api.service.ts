import { PUBLIC_BEARER_TOKEN, STORE_ID, URL_ROOT } from "@/constants/global-constants";
import type { CategoriesDTO, ICategory } from "@/interfaces/category-interfaces";
import type { IProductsDTO } from "@/interfaces/product-interfaces";

export class ApiService {
	private headers: HeadersInit;

	private mainRoute: string;

	constructor() {
		this.headers = {
			accept: 'application/json',
			Authorization: PUBLIC_BEARER_TOKEN,
		};
		this.mainRoute = `${URL_ROOT}${STORE_ID}/`;
		console.log('Api service constructor');
	}

	private get<T>(path: string): Promise<T> {
		return new Promise((res, rej) => {
			fetch(`${this.mainRoute}${path}`, {
				method: 'GET',
				headers: this.headers,				
			})
				.then((res) => res.json())
				.then((data: T) => res(data))
				.catch((err) => rej(err));
		})
	}

	public getCategories(): Promise<CategoriesDTO> {
		return this.get('categories');
	}

	public getCategory(categoryId: number): Promise<ICategory> {
		return this.get(`categories/${categoryId}`);
	}

	public getProducts(categoryId?: number): Promise<IProductsDTO> {
		return this.get(`products${categoryId ? `?categories=${categoryId}` : ''}`);
	}
}
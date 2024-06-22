import { defineStore } from "pinia";
import type { CategoriesDTO, ICategory } from "../interfaces/category-interfaces";

interface ICategoryStore {
	categories: ICategory[];
	currentCategoryId: number | null;
	currentCategory: ICategory | null;
}

export const useCategoryStore = defineStore({
	id: 'categoryStore',
	state: (): ICategoryStore => ({
		categories: [],
		currentCategoryId: null,
		currentCategory: null,
	}),
	actions: {
		setCategories(cat: CategoriesDTO): void {
			this.categories = cat.items;
		},
		setCurrentCategoryId(id: number) {
			this.currentCategoryId = id;
		},
		setCurrentCategory(id: number): void {
			this.currentCategory = this.categories?.find(item => item.id === id) || null;
		} 

	},
})
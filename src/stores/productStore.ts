import { ref, watch } from "vue";
import { defineStore } from "pinia";
import type { IProduct, IProductsDTO } from "@/interfaces/product-interfaces";


export const useProductStore = defineStore('productStore', () => {
	const allProducts = ref<IProduct[]>([]);

	const productsByCategories: Record<number, IProduct[]> = {};

	const productsOfCurrentCategory = ref<IProduct[]>([])

	const productId = ref<number | null>(null);

	const product = ref<IProduct | null>(null);

	function setProducts(data: IProductsDTO): void {
		allProducts.value = data.items;
	}

	function setProductId(id: number) {
		productId.value = id;
	}

	function setProductsOfCurrentCategory(categoryId: number): void {
		productsOfCurrentCategory.value = getProductsByCategory(categoryId);
	}

	function getProductsByCategory(categoryId: number): IProduct[] {
		let products = productsByCategories[categoryId];

		if (!products) {
			products = allProducts.value.filter((p) => p.categoryIds.includes(categoryId));
			productsByCategories[categoryId] = products;
		}

		return products;
	}

	watch(() => [allProducts.value, productId.value] as [IProduct[], number], ([products, id]) => {
		if (products.length && productId) {
			product.value = products.find((p) => p.id === id) || null;
		}
	})

	return {
		allProducts,
		productsOfCurrentCategory,
		product,
		setProducts,
		setProductsOfCurrentCategory,
		setProductId,
	};
});
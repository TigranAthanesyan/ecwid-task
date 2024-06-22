import type { IProduct } from "@/interfaces/product-interfaces";
import { defineStore } from "pinia";

interface IShoppingCartStore {
	productIds: number[];
	products: IShoppingCartProduct[];
}

interface IShoppingCartProduct {
	product: IProduct;
	count: number;
}

export const useShoppingCartStore = defineStore({
	id: 'shoppingCartStore',
	state: (): IShoppingCartStore => ({
		productIds: [],
		products: []
	}),
	getters: { 
		totalCount: (state) => state.products.reduce(
			(acc: number, prd: IShoppingCartProduct) => acc + prd.count,
			0,
		),
		totalPrice: (state) => state.products.reduce(
			(acc: number, prd: IShoppingCartProduct) => acc + prd.count * prd.product.price,
			0
		)
	},
	actions: {
		addProduct(product: IProduct) {
			this.productIds.push(product.id);
			const existingProduct = this.products.find((item) => item.product.id === product.id);
			if (existingProduct) {
				existingProduct.count++
			} else {
				this.products.push({
					product,
					count: 1,
				})
			}
		},
		reduceProduct(id: number) {
			const lastIndex = this.productIds.lastIndexOf(id);
			if (lastIndex !== -1) {
				this.productIds.splice(lastIndex, 1);
			}
			const productIndex = this.products.findIndex((item) => item.product.id === id);
			if (this.products[productIndex].count === 1) {
				this.products.splice(productIndex, 1);
			} else {
				this.products[productIndex].count--;
			}
		},
		removeProduct(id: number) {
			this.productIds = this.productIds.filter((pId) => pId !== id);
			const index = this.products.findIndex((item) => item.product.id === id);
			this.products.splice(index, 1);
		},
		setProducts(ids: number[], allProducts: IProduct[]) {
			this.productIds = ids;
			const products: IShoppingCartProduct[] = [];
			ids.forEach((id) => {
				const item = products.find((it) => it.product.id === id);
				if (item){
					item.count++
				} else {
					products.push({
						product: allProducts.find((p) => p.id === id) as IProduct,
						count: 1
					})
				}
			})
			this.products = products;
		},
		clear() {
			this.productIds = [];
			this.products = [];
		}
	},
})
import { watch } from "vue";
import router from "@/router";
import { ApiService } from "./api.service";
import { useCategoryStore } from "@/stores/categoryStore";
import { useProductStore } from "@/stores/productStore";
import { useShoppingCartStore } from "@/stores/shoppingCartStore";
import { useGlobalStore } from "@/stores/globalStore";
import type { IProduct } from "@/interfaces/product-interfaces";
import type { ICategory } from "@/interfaces/category-interfaces";
import { LOCAL_STORAGE_PRODUCT_IDS } from "@/constants/global-constants";
import { getProductName } from "./utils";


export class EventHandlersService {
	private apiService: ApiService;

	private categoryStore = useCategoryStore();

	private productStore = useProductStore();

	private shoppingCartStore = useShoppingCartStore();

	private globalStore = useGlobalStore();

	constructor({
		apiService,
	}: {
		apiService: ApiService,
	}) {
		this.apiService = apiService;

		const productIdsStr = localStorage.getItem(LOCAL_STORAGE_PRODUCT_IDS) || '';
		const productIds: number[] = JSON.parse(productIdsStr);
		if (productIds.length) {
			const stopWatch = watch(() => this?.productStore?.allProducts, (allProducts) => {
				if (allProducts.length) {
					this.shoppingCartStore.setProducts(productIds, allProducts)
					stopWatch();
				}
			}, { deep: true })
		}

		watch(() => this?.shoppingCartStore?.productIds, (ids) => {
			localStorage.setItem(LOCAL_STORAGE_PRODUCT_IDS, JSON.stringify(ids));
		}, { deep: true });

		watch(() => [this.productStore.allProducts, this.categoryStore.currentCategoryId], ([products, currentCategoryId]) => {
			if ((products as IProduct[]).length && currentCategoryId) {
				this.productStore.setProductsOfCurrentCategory(currentCategoryId as number)
			}
		});

		watch(() => [this.categoryStore.categories, this.categoryStore.currentCategoryId], ([categories, currentCategoryId]) => {
			if ((categories as ICategory[]).length && currentCategoryId) {
				this.categoryStore.setCurrentCategory(currentCategoryId as number)
			}
		});
	}

	public onStoreMount(currentCategoryId: number) {
		if (!this.categoryStore.categories.length) {
			this.apiService.getCategories()
				.then(this.categoryStore.setCategories)
				.catch((err) => console.error(err));
		}

		if (currentCategoryId) {
			this.categoryStore.setCurrentCategoryId(currentCategoryId);
		}

		if (!this.productStore.allProducts.length) {
			this.apiService.getProducts()
				.then(this.productStore.setProducts)
				.catch((err) => console.error(err));
		}
	}

	public onRouteChange() {
		this.globalStore.setBackEnabled(window.history.state.back);
	}

	public onHomeMount() {
		this.globalStore.setTitle('Главная') 
	}

	public onCategoryMount(category: ICategory) {
		this.globalStore.setTitle(category.name)
	}

	public onProductMount(product: IProduct) {
		this.globalStore.setTitle(getProductName(product.name));
	}

	public onCartMount() {
		this.globalStore.setTitle('Корзина');
		this.globalStore.setShowCart(false);
	}

	public onCartUnmount() {
		this.globalStore.setShowCart(true);
	}

	public onCategoryRouteChange(newCategoryId: number) {
		this.categoryStore.setCurrentCategoryId(newCategoryId)
	}

	public onProductIdRouteChange(productId: number) {
		this.productStore.setProductId(productId);
	}

	public onHomeIconClick() {
		router.push({ path: '/'});
	}

	public onProductClick(productId: number) {
		router.push({ name: 'product', params: { productId } })
	}

	public onAddProduct(product: IProduct) {
		this.shoppingCartStore.addProduct(product);
	}

	public onReduceProduct(productId: number) {
		this.shoppingCartStore.reduceProduct(productId);
	}

	public onRemoveProduct(productId: number) {
		this.shoppingCartStore.removeProduct(productId);
	}

	public onCartIconClick() {
		router.push({ name: 'cart' });
	}

	public onTransactionComplete() {
		this.shoppingCartStore.clear()
		router.push({ path: '/' })
	}

	public onGoBack() {
		if (window.history.state.back !== null) {
			router.back();
		}
	}
}
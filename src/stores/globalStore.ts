import { defineStore } from "pinia";

interface IGlobalStore {
	title: string;
	backEnabled: boolean;
	showCart: boolean;
}

export const useGlobalStore = defineStore({
	id: 'globalStore',
	state: (): IGlobalStore => ({
		title: '',
		backEnabled: false,
		showCart: true,
	}),
	actions: {
		setTitle(title: string): void {
			this.title = title;
		},
		setBackEnabled(enabled: boolean): void {
			this.backEnabled = enabled;
		},
		setShowCart(show: boolean): void {
			this.showCart = show
		},
	},
})
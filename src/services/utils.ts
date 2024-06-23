export const getProductName = (name: string): string => {
	const productPrefix = 'ОБРАЗЕЦ. ';
	if (name.startsWith(productPrefix)) {
		return name.slice(productPrefix.length)
	}
	return name
}

export const getProductsWithCorrectEnding = (count: number): string => {
	if (count === 1) {
		return 'продукт'
	}
	if (count === 2 || count === 3 || count === 4) {
		return 'продукта'
	}
	return 'продуктов'
}
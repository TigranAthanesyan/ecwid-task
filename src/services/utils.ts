export const getProductName = (name: string): string => {
	const productPrefix = 'ОБРАЗЕЦ. ';
	if (name.startsWith(productPrefix)) {
		return name.slice(productPrefix.length)
	}
	return name
}
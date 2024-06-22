interface IColorData {
	red: number;
	green: number;
	blue: number;
	alpha: number;
}

export interface IBorderInfo {
	dominatingColor: IColorData;
	homogeneity: boolean;
}
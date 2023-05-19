
export type DigitArray = {
	wholeNumber: number[]
	fractional: number[]
}

export namespace DigitArray {
	export type FromString<S extends string> = S extends `1${infer L}`
		? [1, ...FromString<L>]
		: S extends `2${infer L}`
		? [2, ...FromString<L>]
		: S extends `3${infer L}`
		? [3, ...FromString<L>]
		: S extends `4${infer L}`
		? [4, ...FromString<L>]
		: S extends `5${infer L}`
		? [5, ...FromString<L>]
		: S extends `6${infer L}`
		? [6, ...FromString<L>]
		: S extends `7${infer L}`
		? [7, ...FromString<L>]
		: S extends `8${infer L}`
		? [8, ...FromString<L>]
		: S extends `9${infer L}`
		? [9, ...FromString<L>]
		: S extends `0${infer L}`
		? [0, ...FromString<L>]
		: []
}

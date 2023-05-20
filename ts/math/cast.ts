import type { StringToNumber } from '../number/cast.js'

export type StringToMathDevice<S extends string, Fail = never> = S extends `-${infer R}n`
	? ['bigint', '-', MathDevice.CastToNumberArray<R>]
	: S extends `${infer R}n`
	? ['bigint', '+', MathDevice.CastToNumberArray<R>]
	: S extends `-${infer R}`
	? ['number', '-', ...MathDevice.CastToNumberParts<R>]
	: S extends `${infer R}`
	? ['number', '+', ...MathDevice.CastToNumberParts<R>]
	: Fail

export namespace MathDevice {
	export type CastToNumberParts<S extends string> = StringToNumber<S> extends infer N extends number
		? `${N}` extends `${infer W}.${infer F}`
			? CastToNumberArray<F> extends infer Y extends any[] ? [[...CastToNumberArray<W>, ...Y], Y['length']] : never
			: [CastToNumberArray<S>, 0]
		: never
	export type CastToNumberArray<S extends string> = S extends `1${infer L}`
		? [1, ...CastToNumberArray<L>]
		: S extends `2${infer L}`
		? [2, ...CastToNumberArray<L>]
		: S extends `3${infer L}`
		? [3, ...CastToNumberArray<L>]
		: S extends `4${infer L}`
		? [4, ...CastToNumberArray<L>]
		: S extends `5${infer L}`
		? [5, ...CastToNumberArray<L>]
		: S extends `6${infer L}`
		? [6, ...CastToNumberArray<L>]
		: S extends `7${infer L}`
		? [7, ...CastToNumberArray<L>]
		: S extends `8${infer L}`
		? [8, ...CastToNumberArray<L>]
		: S extends `9${infer L}`
		? [9, ...CastToNumberArray<L>]
		: S extends `0${infer L}`
		? [0, ...CastToNumberArray<L>]
		: []
}

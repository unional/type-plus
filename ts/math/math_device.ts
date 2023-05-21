import type { Tail } from '../array/tail.js'
import type { StringToNumber } from '../number/cast.js'

/**
 * @note The value inside `number[]` range from 0 to 19.
 * That's the secret sauce of `MathDevice` type.
 */
export type MathDevice = ['bigint', '-' | '+', number[]] | ['number', '-' | '+', number[], number[]]

export namespace MathDevice {
	export type StringToNumberParts<S extends string> = StringToNumber<S> extends infer N extends number
		? `${N}` extends `${infer W}.${infer F}`
			? [StringToNumberArray<W>, StringToNumberArray<F>]
			: [StringToNumberArray<S>, []]
		: never
	export type StringToNumberArray<S extends string> = S extends `1${infer L}`
		? [1, ...StringToNumberArray<L>]
		: S extends `2${infer L}`
		? [2, ...StringToNumberArray<L>]
		: S extends `3${infer L}`
		? [3, ...StringToNumberArray<L>]
		: S extends `4${infer L}`
		? [4, ...StringToNumberArray<L>]
		: S extends `5${infer L}`
		? [5, ...StringToNumberArray<L>]
		: S extends `6${infer L}`
		? [6, ...StringToNumberArray<L>]
		: S extends `7${infer L}`
		? [7, ...StringToNumberArray<L>]
		: S extends `8${infer L}`
		? [8, ...StringToNumberArray<L>]
		: S extends `9${infer L}`
		? [9, ...StringToNumberArray<L>]
		: S extends `0${infer L}`
		? [0, ...StringToNumberArray<L>]
		: []

	export type ToBigint<M extends MathDevice, Fail = never> = M[0] extends 'bigint'
		? M[1] extends '+'
			? NumberArrayToString<M[2]> extends `${infer N extends bigint}`
				? N
				: never
			: M[2] extends [0]
			? 0n
			: `-${NumberArrayToString<M[2]>}` extends `${infer N extends bigint}`
			? N
			: never
		: Fail
	export type ToNumber<M extends MathDevice, Fail = never> = M[0] extends 'number'
		? M[1] extends '+'
			? M[3] extends []
				? NumberArrayToString<M[2]> extends `${infer W extends number}`
					? [number] extends [W]
						? NumberArrayToString<M[2]> extends `${infer B extends bigint}`
							? B
							: never
						: W
					: never
				: M[3] extends number[]
				? `${NumberArrayToString<M[2]>}.${NumberArrayToString<M[3]>}` extends `${infer W extends number}`
					? W
					: never
				: never
			: M[3] extends []
			? `-${NumberArrayToString<M[2]>}` extends `${infer W extends number}`
				? [number] extends [W]
					? `-${NumberArrayToString<M[2]>}` extends `${infer B extends bigint}`
						? B
						: never
					: W
				: never
			: M[3] extends number[]
			? `-${NumberArrayToString<M[2]>}.${NumberArrayToString<M[3]>}` extends `${infer W extends number}`
				? W
				: never
			: never
		: Fail

	type NumberArrayToString<N extends number[]> = N['length'] extends 0
		? ''
		: `${N[0]}${NumberArrayToString<Tail<N>>}`
}

import type { ArraySplitAtDevice } from '../array/array_plus.split_at.js'
import type { Tail } from '../array/tail.js'
import type { StringToNumber } from '../number/cast.js'

/**
 * @note The value inside `number[]` range from 0 to 19.
 * That's the secret sauce of `MathDevice` type.
 */
export type MathDevice = ['bigint', '-' | '+', number[]] | ['number', '-' | '+', number[], number]

export namespace MathDevice {
	export type CastToNumberParts<S extends string> = StringToNumber<S> extends infer N extends number
		? `${N}` extends `${infer W}.${infer F}`
			? CastToNumberArray<W> extends infer Y extends any[]
				? [[...Y, ...CastToNumberArray<F>], Y['length']]
				: never
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
			? M[3] extends 0
				? NumberArrayToString<M[2]> extends `${infer N extends number}`
					? N
					: never
				: M[3] extends infer Exponent extends number
				? ArraySplitAtDevice<M[2], [], Exponent> extends [infer W extends number[], infer F extends number[]]
					? `${NumberArrayToString<W>}.${NumberArrayToString<F>}` extends `${infer N extends number}`
						? N
						: never
					: never
				: never
			: M[3] extends 0
			? `-${NumberArrayToString<M[2]>}` extends `${infer N extends number}`
				? N
				: never
			: M[3] extends infer Exponent extends number
			? ArraySplitAtDevice<M[2], [], Exponent> extends [infer W extends number[], infer F extends number[]]
				? `-${NumberArrayToString<W>}.${NumberArrayToString<F>}` extends `${infer N extends number}`
					? N
					: never
				: never
			: never
		: Fail

	type NumberArrayToString<N extends number[]> = N['length'] extends 0
		? ''
		: `${N[0]}${NumberArrayToString<Tail<N>>}`
}

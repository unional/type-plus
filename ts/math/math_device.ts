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

	export type Normalize<M extends MathDevice> = M[0] extends 'bigint'
		? NormalizeBigint<M>
		: NormalizeNumber<M>

	type NormalizeBigint<M extends MathDevice> = M
	type NormalizeNumber<M extends MathDevice> = M

	export type DigitAdd<A extends number, B extends number> = [
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		[2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
		[3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
		[5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		[6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
		[7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
		[8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
		[9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
	][A][B]

	export type DigitSubtract<A extends number, B extends number> = [
		[0, -1, -2, -3, -4, -5, -6, -7, -8, -9],
		[1, 0, -1, -2, -3, -4, -5, -6, -7, -8],
		[2, 1, 0, -1, -2, -3, -4, -5, -6, -7],
		[3, 2, 1, 0, -1, -2, -3, -4, -5, -6],
		[4, 3, 2, 1, 0, -1, -2, -3, -4, -5],
		[5, 4, 3, 2, 1, 0, -1, -2, -3, -4],
		[6, 5, 4, 3, 2, 1, 0, -1, -2, -3],
		[7, 6, 5, 4, 3, 2, 1, 0, -1, -2],
		[8, 7, 6, 5, 4, 3, 2, 1, 0, -1],
		[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
	][A][B]

	export type DigitMultiply<A extends number, B extends number> = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0, 2, 4, 6, 8, 10, 12, 14, 16, 18],
		[0, 3, 6, 9, 12, 15, 18, 21, 24, 27],
		[0, 4, 8, 12, 16, 20, 24, 28, 32, 36],
		[0, 5, 10, 15, 20, 25, 30, 35, 40, 45],
		[0, 6, 12, 18, 24, 30, 36, 42, 48, 54],
		[0, 7, 14, 21, 28, 35, 42, 49, 56, 63],
		[0, 8, 16, 24, 32, 40, 48, 56, 64, 72],
		[0, 9, 18, 27, 36, 45, 54, 63, 72, 81]
	][A][B]
}

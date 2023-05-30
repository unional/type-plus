import type { SplitAt } from '../array/array_plus.split_at.js'
import type { Tail } from '../array/tail.js'
import type { IsNever } from '../never/never_type.js'
import type { StringToNumber } from './math_device2.js'

/**
 * @note The value inside `number[]` range from -90 to 90.
 * That's the secret sauce of `MathDevice` type.
 */
export type MathDevice = ['bigint', '-' | '+', number[]] | ['number', '-' | '+', number[], number[]]

export type MathDevice2 = ['bigint'|'number', '+'|'-', number[], number]

export type NumberToMathDevice2<N extends number> = []

export namespace MathDevice {
	export type StringToNumberParts<S extends string> = StringToNumber<S, never> extends infer N extends number
		? `${N}` extends `${infer W}.${infer F}`
			? [StringToNumberPart<W>, StringToNumberPart<F>]
			: [StringToNumberPart<S>, []]
		: never
	export type StringToNumberPart<S extends string> = S extends `1${infer L}`
		? [1, ...StringToNumberPart<L>]
		: S extends `2${infer L}`
		? [2, ...StringToNumberPart<L>]
		: S extends `3${infer L}`
		? [3, ...StringToNumberPart<L>]
		: S extends `4${infer L}`
		? [4, ...StringToNumberPart<L>]
		: S extends `5${infer L}`
		? [5, ...StringToNumberPart<L>]
		: S extends `6${infer L}`
		? [6, ...StringToNumberPart<L>]
		: S extends `7${infer L}`
		? [7, ...StringToNumberPart<L>]
		: S extends `8${infer L}`
		? [8, ...StringToNumberPart<L>]
		: S extends `9${infer L}`
		? [9, ...StringToNumberPart<L>]
		: S extends `0${infer L}`
		? [0, ...StringToNumberPart<L>]
		: S extends `-1${infer L}`
		? [-1, ...StringToNumberPart<L>]
		: S extends `-2${infer L}`
		? [-2, ...StringToNumberPart<L>]
		: S extends `-3${infer L}`
		? [-3, ...StringToNumberPart<L>]
		: S extends `-4${infer L}`
		? [-4, ...StringToNumberPart<L>]
		: S extends `-5${infer L}`
		? [-5, ...StringToNumberPart<L>]
		: S extends `-6${infer L}`
		? [-6, ...StringToNumberPart<L>]
		: S extends `-7${infer L}`
		? [-7, ...StringToNumberPart<L>]
		: S extends `-8${infer L}`
		? [-8, ...StringToNumberPart<L>]
		: S extends `-9${infer L}`
		? [-9, ...StringToNumberPart<L>]
		: S extends `-0${infer L}`
		? [-0, ...StringToNumberPart<L>]
		: []

	export type ToBigint<M extends MathDevice, Fail = never> = Normalize<M> extends infer R extends MathDevice
		? R[0] extends 'bigint'
			? R[1] extends '+'
				? NumberPartToString<R[2]> extends `${infer N extends bigint}`
					? N
					: never
				: R[2] extends [0]
				? 0n
				: `-${NumberPartToString<R[2]>}` extends `${infer N extends bigint}`
				? N
				: never
			: Fail
		: never

	export type ToNumber<M extends MathDevice, Fail = never> = Normalize<M> extends infer R extends MathDevice
		? R[0] extends 'number'
			? R[1] extends '+'
				? R[3] extends []
					? NumberPartToString<R[2]> extends `${infer W extends number}`
						? [number] extends [W]
							? NumberPartToString<R[2]> extends `${infer B extends bigint}`
								? B
								: never
							: W
						: never
					: R[3] extends number[]
					? `${NumberPartToString<R[2]>}.${NumberPartToString<R[3]>}` extends `${infer W extends number}`
						? W
						: never
					: never
				: R[3] extends []
				? `-${NumberPartToString<R[2]>}` extends `${infer W extends number}`
					? [number] extends [W]
						? `-${NumberPartToString<R[2]>}` extends `${infer B extends bigint}`
							? B
							: never
						: W
					: never
				: R[3] extends number[]
				? `-${NumberPartToString<R[2]>}.${NumberPartToString<R[3]>}` extends `${infer W extends number}`
					? W
					: never
				: never
			: Fail
		: never
	type NumberPartToString<N extends number[]> = N['length'] extends 0
		? ''
		: `${N[0]}${NumberPartToString<Tail<N>>}`

	export type Normalize<M extends MathDevice> = M[3] extends number[]
		? NumericConversion<M[0], M[1], NormalizeValueDevice<[...M[2], ...M[3]], []>>
		: NumericConversion<M[0], M[1], NormalizeValueDevice<M[2], []>>

	export type NumericConversion<T extends 'bigint' | 'number', S extends '+' | '-', N extends number[]> = [T, S, N]

	/**
	 * Normalize a value.
	 * It converts value to single digit array,
	 * and only the first digit can be negative.
	 */
	export type NormalizeValueDevice<N extends number[], R extends number[]> = N extends []
		? R
		: N extends [infer Tail extends number]
		? `${Tail}` extends `${infer T1 extends number}${infer T2 extends number}`
			? NormalizeValueDevice<[], [T1, T2, ...R]>
			: `${Tail}` extends `-${infer T1 extends number}${infer T2 extends number}`
			? `-${T1}` extends `${infer NT extends number}`
				? NormalizeValueDevice<[], [NT, T2, ...R]>
				: never
			: NormalizeValueDevice<[], [Tail, ...R]>
		: N extends [infer Head extends number, infer Tail extends number]
		? `${Tail}` extends `${infer T1 extends number}${infer T2 extends number}`
			? NormalizeValueDevice<[IntegerEntryAdd<Head, T1>], [T2, ...R]>
			: `${Tail}` extends `-${infer T1 extends number}${infer T2 extends number}`
			? `-${T1}` extends `${infer NT extends number}`
				? NormalizeValueDevice<[IntegerEntryAdd<Head, NT>], [T2, ...R]>
				: never
			: `${Tail}` extends `-${number}`
			? NormalizeValueDevice<[IntegerEntryAdd<Head, -1>], [Plus10[Tail], ...R]>
			: NormalizeValueDevice<[Head], [Tail, ...R]>
		: N extends [...infer Heads extends number[], infer Head extends number, infer Tail extends number]
		? `${Tail}` extends `${infer T1 extends number}${infer T2 extends number}`
			? NormalizeValueDevice<[...Heads, IntegerEntryAdd<Head, T1>], [T2, ...R]>
			: `${Tail}` extends `-${infer T1 extends number}${infer T2 extends number}`
			? `-${T1}` extends `${infer NT extends number}`
				? NormalizeValueDevice<[...Heads, IntegerEntryAdd<Head, NT>], [T2, ...R]>
				: never
			: `${Tail}` extends `-${number}`
			? NormalizeValueDevice<[...Heads, IntegerEntryAdd<Head, -1>], [Plus10[Tail], ...R]>
			: NormalizeValueDevice<[...Heads, Head], [Tail, ...R]>
		: never
	type Plus10 = { [k in number]: number } & {
		'-1': 9
		'-2': 8
		'-3': 7
		'-4': 6
		'-5': 5
		'-6': 4
		'-7': 3
		'-8': 2
		'-9': 1
	}

	/**
	 * Normalize MathDevice that the number parts can transform to string.
	 */
	export type NormalizeOld<M extends MathDevice> = M[0] extends 'bigint'
		? NormalizeIntegerArrayDevice<M[2], []> extends infer D
			? D extends [infer Sign, infer N]
				? [M[1], Sign] extends ['+', '+'] | ['-', '-']
					? ['bigint', '+', N]
					: ['bigint', '-', N]
				: never
			: never
		: M[3] extends number[]
		? NormalizeIntegerArrayDevice<[...M[2], ...M[3]], []> extends infer D
			? [D, M[3]['length']] extends [
					[infer Sign, infer N extends number[]],
					infer FractionalLength extends number
			  ]
				? [M[1], Sign] extends ['+', '+'] | ['-', '-']
					? FractionalLength extends 0
						? ['number', '+', N, []]
						: ['number', '+', ...SplitAt<N, ToNegative<FractionalLength>>]
					: FractionalLength extends 0
					? ['number', '-', N, []]
					: ['number', '-', ...SplitAt<N, ToNegative<FractionalLength>>]
				: never
			: never
		: never

	type ToNegative<N extends number> = `-${N}` extends `${infer W extends number}` ? W : never

	type NormalizeIntegerArrayDevice<M extends number[], R extends number[]> = M extends []
		? R extends [infer F extends number, ...infer Rest extends number[]]
			? `${F}` extends `-${infer X extends number}`
				? ['-', [X, ...Rest]]
				: ['+', [F, ...Rest]]
			: never
		: M extends [infer Tail extends number]
		? NormalizeDigit<Tail> extends infer Digits extends number[]
			? NormalizeIntegerArrayDevice<[], [...Digits, ...R]>
			: never
		: M extends [...infer Heads extends number[], infer Tail extends number]
		? NormalizeDigit<Tail> extends infer Digits extends number[]
			? Digits extends [infer Digit extends number]
				? NormalizeIntegerArrayDevice<Heads, [Digit, ...R]>
				: Digits extends [infer D1 extends number, infer D2 extends number]
				? Heads extends [infer Head extends number]
					? NormalizeIntegerArrayDevice<[IntegerEntryAdd<Head, D1>], [D2, ...R]>
					: Heads extends [...infer Pres extends number[], infer Head extends number]
					? NormalizeIntegerArrayDevice<[...Pres, IntegerEntryAdd<Head, D1>], [D2, ...R]>
					: Heads
				: never
			: never
		: never

	export type NormalizeDigit<N extends number> = NormalizeSingleDigit<N> extends infer D extends [number]
		? IsNever<D, StringToNumberPart<`${N}`>, D>
		: never

	type NormalizeSingleDigit<N extends number> = ({ [k in number]: never } & {
		'-9': [-9]
		'-8': [-8]
		'-7': [-7]
		'-6': [-6]
		'-5': [-5]
		'-4': [-4]
		'-3': [-3]
		'-2': [-2]
		'-1': [-1]
		0: [0]
		1: [1]
		2: [2]
		3: [3]
		4: [4]
		5: [5]
		6: [6]
		7: [7]
		8: [8]
		9: [9]
	})[N]

	/**
	 * Adds two intger entries together.
	 *
	 * The first entry should always between `0` and `9`.
	 * The second entry can range from `-81` to `81`.
	 *
	 * The code needs to be adjusted if this is no longer true.
	 */
	export type IntegerEntryAdd<A extends number, B extends number> = `${A}` extends `-${infer AD extends number}`
		? `${B}` extends `-${infer BD extends number}`
			? ToNegative<PositiveEntryAdd<AD, BD>>
			: PositiveEntrySubtract<B, AD>
		: `${B}` extends `-${infer BD extends number}`
		? PositiveEntrySubtract<A, BD>
		: PositiveEntryAdd<A, B>

	export type PositiveEntryAdd<A extends number, B extends number> = [
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		[2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
		[3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
		[5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		[6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
		[7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
		[8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
		[9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
		[10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
		[11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
		[12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
		[13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
		[14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
		[15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
		[16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
		[17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
		[18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
		[19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
		[20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
		[21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
		[22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
		[23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
		[24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
		[25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
		[26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
		[27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
		[28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
		[29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
		[30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
		[31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
		[32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
		[33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
		[34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
		[35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
		[36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
		[37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
		[38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
		[39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
		[40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
		[41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
		[42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
		[43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
		[44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
		[45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
		[46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
		[47, 48, 49, 50, 51, 52, 53, 54, 55, 56],
		[48, 49, 50, 51, 52, 53, 54, 55, 56, 57],
		[49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
		[50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
		[51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
		[52, 53, 54, 55, 56, 57, 58, 59, 60, 61],
		[53, 54, 55, 56, 57, 58, 59, 60, 61, 62],
		[54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
		[55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
		[56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
		[57, 58, 59, 60, 61, 62, 63, 64, 65, 66],
		[58, 59, 60, 61, 62, 63, 64, 65, 66, 67],
		[59, 60, 61, 62, 63, 64, 65, 66, 67, 68],
		[60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
		[61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
		[62, 63, 64, 65, 66, 67, 68, 69, 70, 71],
		[63, 64, 65, 66, 67, 68, 69, 70, 71, 72],
		[64, 65, 66, 67, 68, 69, 70, 71, 72, 73],
		[65, 66, 67, 68, 69, 70, 71, 72, 73, 74],
		[66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
		[67, 68, 69, 70, 71, 72, 73, 74, 75, 76],
		[68, 69, 70, 71, 72, 73, 74, 75, 76, 77],
		[69, 70, 71, 72, 73, 74, 75, 76, 77, 78],
		[70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
		[71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
		[72, 73, 74, 75, 76, 77, 78, 79, 80, 81],
		[73, 74, 75, 76, 77, 78, 79, 80, 81, 82],
		[74, 75, 76, 77, 78, 79, 80, 81, 82, 83],
		[75, 76, 77, 78, 79, 80, 81, 82, 83, 84],
		[76, 77, 78, 79, 80, 81, 82, 83, 84, 85],
		[77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
		[78, 79, 80, 81, 82, 83, 84, 85, 86, 87],
		[79, 80, 81, 82, 83, 84, 85, 86, 87, 88],
		[80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
		[81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
		[82, 83, 84, 85, 86, 87, 88, 89, 90, 91],
		[83, 84, 85, 86, 87, 88, 89, 90, 91, 92],
		[84, 85, 86, 87, 88, 89, 90, 91, 92, 93],
		[85, 86, 87, 88, 89, 90, 91, 92, 93, 94],
		[86, 87, 88, 89, 90, 91, 92, 93, 94, 95],
		[87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
		[88, 89, 90, 91, 92, 93, 94, 95, 96, 97],
		[89, 90, 91, 92, 93, 94, 95, 96, 97, 98]
	][A][B]

	/**
	 * Subtract two positive numbers.
	 * The number range from 0 to 81.
	 */
	export type PositiveEntrySubtract<A extends number, B extends number> = [`${A}`, `${B}`] extends [
		`${infer A1 extends number}${infer A2 extends number}`,
		`${infer B1 extends number}${infer B2 extends number}`
	]
		? PositiveEntrySubtract<A2, B2>
		: `${A}` extends `${infer A1 extends number}${infer A2 extends number}`
		? PositiveEntrySubtract<A2, B>
		: `${B}` extends `${infer B1 extends number}${infer B2 extends number}`
		? PositiveEntrySubtract<A, B2>
		: SingleDigitSubtract<A, B>

	export type SingleDigitSubtract<A extends number, B extends number> = [
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

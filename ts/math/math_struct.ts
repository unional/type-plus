import { SplitAt } from '../array/array_plus.split_at.js'
import { Tail } from '../array/tail.js'
import { PadStart } from '../tuple/tuple_plus.pad_start.js'
import { ToNegative } from './math_plus.to_negative.js'

/**
 * Internal number representation to perform math operations.
 *
 * `[type, sign, digits, exponent]`
 * It's basically the floating point representation,
 * except that the digits length is not limited.
 *
 * @note The value inside `number[]` range from -90 to 90.
 * That's the secret sauce of `MathStruct` type.
 */
export type MathStruct = ['bigint' | 'number', '+' | '-', NumberStruct]

/**
 * [Digits, Exponent, SignIndex]
 *
 * Digit range from -89 to 89.
 * The max case comes from multiplication:
 *
 * ```
 * 99 * 9
 * => [[    9,  9], 0, 0]
 * *  [        [9], 0, 0]
 * => [[   81, 81], 0, 0]
 * => [[   89,  1], 0, 0]
 * => [[ 8, 9,  1], 0, 0]
 * ```
 *
 * Exponent is the negative exponent of the number.
 *
 * ```
 * 1.23 = 123 x e^-2 = [[1, 2, 3], 2, 0]
 * ```
 *
 * SignIndex is the Digit index where the sign is located.
 * It is used to track which Digit can be negative when the `NumberStruct` is normalized.
 * It is the same as how many zeros at the start of the Digits.
 *
 * It is used to determine when the normalization can stop.
 *
 * ```
 * -0.01 = [[0, 0, -1], 2, 2]
 * -0.00123 = [[0, 0, 0, -1, 2, 3], 5, 3]
 * ```
 */
export type NumberStruct = [number[], number, number]

export type NumericToMathStruct<N extends number | bigint> = N extends number
	? NumberToMathStruct<N>
	: N extends bigint
	? BigintToMathStruct<N>
	: never

export type NumberToMathStruct<N extends number> = `${N}` extends `-${infer R}`
	? ['number', '-', StringToNumberStruct<R>]
	: ['number', '+', StringToNumberStruct<`${N}`>]

export type BigintToMathStruct<N extends bigint> = `${N}` extends `-${infer R}`
	? ['bigint', '-', StringToNumberStruct<R>]
	: ['bigint', '+', StringToNumberStruct<`${N}`>]

/**
 * `S` is expected to be positive number.
 *
 * Either `12345` or `123.45`
 */
export type StringToNumberStruct<S extends string> = S extends `${infer W}.${infer F}`
	? NormalizeFloatingPoint<StringToNumberArray<W>, StringToNumberArray<F>>
	: [StringToNumberArray<S>, 0, 0]

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
	: S extends `-1${infer L}`
	? [-1, ...StringToNumberArray<L>]
	: S extends `-2${infer L}`
	? [-2, ...StringToNumberArray<L>]
	: S extends `-3${infer L}`
	? [-3, ...StringToNumberArray<L>]
	: S extends `-4${infer L}`
	? [-4, ...StringToNumberArray<L>]
	: S extends `-5${infer L}`
	? [-5, ...StringToNumberArray<L>]
	: S extends `-6${infer L}`
	? [-6, ...StringToNumberArray<L>]
	: S extends `-7${infer L}`
	? [-7, ...StringToNumberArray<L>]
	: S extends `-8${infer L}`
	? [-8, ...StringToNumberArray<L>]
	: S extends `-9${infer L}`
	? [-9, ...StringToNumberArray<L>]
	: S extends `-0${infer L}`
	? [-0, ...StringToNumberArray<L>]
	: []

export type NormalizeFloatingPoint<
	W extends number[],
	E extends number[],
	T extends number[] = [...W, ...E],
	Z extends number[] = E
> = T extends [0, ...infer Tail extends number[]]
	? NormalizeFloatingPoint<W, E, Tail, Z>
	: [...W, ...E] extends infer D extends number[]
	? [D, Z['length'], CountZeros<D, []>]
	: never

type CountZeros<T extends number[], R extends number[]> = T extends []
	? R['length']
	: T extends [0, ...infer Tail extends number[]]
	? CountZeros<Tail, [0, ...R]>
	: R['length']

export type NormalizedMathStructToNumeric<M extends MathStruct, Fail = never> = NormalizedMathStructToBigint<
	M,
	NormalizedMathStructToNumber<M, Fail>
>

type NormalizedMathStructToBigint<M extends MathStruct, Fail = never> = M[0] extends 'bigint'
	? M[1] extends '+'
		? StringToBigint<NumberStructToString<M[2]>, Fail>
		: M[2] extends [[0], 0, 0]
		? 0n
		: StringToBigint<`-${NumberStructToString<M[2]>}`, Fail>
	: Fail

type StringToBigint<S extends string, Fail> = S extends `${infer N extends bigint}` ? N : Fail

type NormalizedMathStructToNumber<M extends MathStruct, Fail = never> = M[1] extends '+'
	? StringToNumber<NumberStructToString<M[2]>, Fail>
	: M[2] extends [[0], 0, 0]
	? 0
	: StringToNumber<`-${NumberStructToString<M[2]>}`, Fail>

export type StringToNumber<S extends string, Fail> = S extends `${infer N extends number}`
	? number extends N
		? StringToBigint<S, Fail>
		: N
	: Fail

type NumberStructToString<N extends NumberStruct> = PadStart<
	N[0],
	N[1],
	0
> extends infer Padded extends number[]
	? Padded['length'] extends N[1]
		? NumberArrayToString<[0, '.', ...Padded]>
		: SplitAt<Padded, ToNegative<N[1]>> extends [infer W extends number[], infer E extends number[]]
		? W extends []
			? E extends []
				? ''
				: NumberArrayToString<E>
			: NumberArrayToString<[...W, '.', ...E]>
		: never
	: never

type NumberArrayToString<A extends Array<number | string>> = number extends A['length']
	? ''
	: A['length'] extends 0
	? ''
	: `${A[0]}${NumberArrayToString<Tail<A>>}`

export type NormalizeMathStruct<M extends MathStruct> = [M[0], M[1], NormalizeNumberStruct<M[2]>]

type NormalizeNumberStruct<N extends NumberStruct, R extends NumberStruct = [[], 0, 0]> = [N[0], N[1], N[2]]

/**
 * Add `A` and `B` together.
 *
 * `A` and `B` must be normalized,
 * meaning each entry are single digits.
 */
export type AddNormalizedNumberStruct<A extends NumberStruct, B extends NumberStruct> = GetMinPadEnd<
	A[1],
	B[1]
> extends [infer Pads extends number[], infer Longer]
	? Longer extends 'A'
		? AddNormalizedNumberArrayDevice<A[0], [...B[0], ...Pads], A[1]>
		: AddNormalizedNumberArrayDevice<[...A[0], ...Pads], B[0], B[1]>
	: never

type AddNormalizedNumberArrayDevice<
	A extends number[],
	B extends number[],
	E extends number,
	R extends number[] = []
> = A extends []
	? B extends []
		? [R, E, 0]
		: B extends [...infer BH extends number[], infer BL extends number]
		? AddNormalizedNumberArrayDevice<[], BH, E, [BL, ...R]>
		: never
	: B extends []
	? A extends [...infer AH extends number[], infer AL extends number]
		? AddNormalizedNumberArrayDevice<AH, [], E, [AL, ...R]>
		: never
	: [A, B] extends [
			[...infer AH extends number[], infer AL extends number],
			[...infer BH extends number[], infer BL extends number]
	  ]
	? AddNormalizedNumberArrayDevice<AH, BH, E, [IntegerEntryAdd<AL, BL>, ...R]>
	: never

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

export type SubtractDevice<
	A extends NumberStruct,
	B extends NumberStruct,
	R extends NumberStruct | unknown
> = A

/**
 * This is used to align the `NumberStruct` during `Add/Subtract`.
 */
export type GetMinPadEnd<A extends number, B extends number, R extends number[] = []> = R['length'] extends A
	? [R, 'B']
	: R['length'] extends B
	? [R, 'A']
	: GetMinPadEnd<A, B, [0, ...R]>

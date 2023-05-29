import type { SplitAt } from '../array/array_plus.split_at.js'
import type { Tail } from '../array/tail.js'
import type { PadStart } from '../tuple/tuple_plus.pad_start.js'
import type { ToNegative } from './math_plus.to_negative.js'

/**
 * Internal numeric representation to perform math operations.
 *
 * NumericStruct: `[Type, DigitsStruct]`
 * DigitsStruct: `[Sign, Digits, Exponent]`
 *
 * It is similar to the floating point representation with some minor differences.
 *
 * @template Type Type of the value, either `number` or `bigint`.
 * It captures the original type of the value,
 * so that at the end of the operation,
 * the value can be adjusted accordingly.
 *
 * @template Sign Sign of the value, either `+` or `-`.
 *
 * @template Digits Digits of the value.
 * It is a tuple of digits,
 * where each digits can range from 0 to 9 during input,
 * and range from -89 to 89 during operation.
 * The max case comes from multiplication:
 *
 * ```
 * 99 * 9
 * => [[    9,  9], 0]
 * *  [        [9], 0]
 * => [[   81, 81], 0]
 * => [[   89,  1], 0]
 * => [[ 8, 9,  1], 0]
 * ```
 *
 * Unlike floating point numbers, the digits length is not limited.
 *
 * @template Exponent Exponent is the negative exponent of the number.
 *
 * ```
 * 1.23 = 123e^-2 = [[1, 2, 3], 2]
 * 0.0123 = 123e^-4 = [[1, 2, 3], 4]
 * ```
 *
 * There are 2 kinds of `NumericStruct`:
 * - Normalized: The `NumericStruct` is clean and can be converted to/from `number` or `bigint`
 * - Not normalized: The `DigitsStruct` within the `NumericStruct` is normalized,
 *   but may need to convert between `number` and `bigint`.\
 *   e.g. bigint + float => float (if possible), number + number => bigint (too big)
 *
 * During operations, the `DigitsStruct` can be not normalized,
 * but each operation should always normalize the `DigitsStruct` before returning.
 * Each operations assume the input `DigitsStruct` is normalized.
 *
 * All operations are performed in similar way:
 *
 * value -> NormalizedNumericStruct -> operation(NormalizedDigitsStruct) -> NormalizedNumericStruct -> Value
 *
 * This allows the operations to be composable.
 * */
export type NumericStruct = ['bigint' | 'number', DigitsStruct]
// These are used to reference the NumericStruct values
export type TYPE = 0
export type DIGITS_STRUCT = 1

export namespace NumericStruct {
	/**
	 * Creates a `NumericStruct` from number or bigint `N`.
	 */
	export type FromNumeric<N extends number | bigint> = N extends number
		? ['number', DigitsStruct.FromNumber<N>]
		: N extends bigint
		? ['bigint', DigitsStruct.FromBigint<N>]
		: never

	/**
	 * Converts a `NumericStruct` to a number or bigint.
	 *
	 * It includes the normalization of the `NumericStruct`.
	 */
	export type ToNumeric<M extends NumericStruct, Fail = never> = NormalizedToBigint<
		M,
		NormalizedToNumber<M, Fail>
	>
	type NormalizedToBigint<M extends NumericStruct, Fail = never> = M[TYPE] extends 'bigint'
		? StringToBigint<DigitsStruct.ToString<M[DIGITS_STRUCT]>, Fail>
		: StringToNumber<DigitsStruct.ToString<M[DIGITS_STRUCT]>, Fail>

	type NormalizedToNumber<M extends NumericStruct, Fail = never> = StringToNumber<
		DigitsStruct.ToString<M[DIGITS_STRUCT]>,
		Fail
	>
}

// TODO: move into `NumericHelpers`
type StringToBigint<S extends string, Fail> = S extends `${infer N extends bigint}` ? N : Fail

// TODO: move into `NumericHelpers`
export type StringToNumber<S extends string, Fail> = S extends `${infer N extends number}`
	? number extends N
		? StringToBigint<S, Fail>
		: N
	: Fail

export type DigitsStruct = [Sign: '+' | '-', Digits: number[], Exponent: number]
// These are used to reference the DigitsStruct values
export type SIGN = 0
export type DIGITS = 1
export type EXPONENT = 2

export namespace DigitsStruct {
	/**
	 * Creates a `DigitsStruct` from number `N`.
	 *
	 * @template N Number to create `DigitsStruct` from.
	 */
	export type FromNumber<N extends number> = `${N}` extends `-${infer R}`
		? R extends `${infer W}.${infer F}`
			? NormalizeFloatingPoint<'-', DigitArray.FromString<W>, DigitArray.FromString<F>>
			: ['-', DigitArray.FromString<R>, 0]
		: `${N}` extends `${infer W}.${infer F}`
		? NormalizeFloatingPoint<'+', DigitArray.FromString<W>, DigitArray.FromString<F>>
		: ['+', DigitArray.FromString<`${N}`>, 0]

	/**
	 * Creates a `DigitsStruct` from floating point components `W` (whole) and `F` (fractional).
	 *
	 * @template Sign Passthrough sign of the `DigitsStruct`.
	 * @template T Device to trim way any leading zeros.
	 */
	type NormalizeFloatingPoint<
		Sign extends '+' | '-',
		W extends number[],
		F extends number[],
		T extends number[] = [...W, ...F]
	> = T extends [0, ...infer Tail extends number[]]
		? NormalizeFloatingPoint<Sign, W, F, Tail>
		: [Sign, T, F['length']]

	/**
	 * Creates a `DigitsStruct` from bigint `N`.
	 *
	 * @template N Number to create `DigitsStruct` from.
	 */
	export type FromBigint<N extends bigint> = `${N}` extends `-${infer R}`
		? ['-', DigitArray.FromString<R>, 0]
		: ['+', DigitArray.FromString<`${N}`>, 0]

	/**
	 * Converts a `DigitsStruct` to string.
	 *
	 * @template D A normalized `DigitsStruct`.
	 */
	export type ToString<D extends DigitsStruct> = (
		PadStart<D[DIGITS], D[EXPONENT], 0> extends infer Padded extends number[]
			? Padded['length'] extends D[EXPONENT]
				? DigitArray.ToString<[0, '.', ...Padded]>
				: SplitAt<Padded, ToNegative<D[EXPONENT]>> extends [
						infer W extends number[],
						infer E extends number[]
				  ]
				? W extends []
					? E extends []
						? '' // both W and E are empty, should be never?
						: DigitArray.ToString<E>
					: DigitArray.ToString<[...W, '.', ...E]>
				: never
			: never
	) extends infer R
		? R extends '0'
			? R
			: R extends string
			? D[SIGN] extends '-'
				? `-${R}`
				: R
			: never
		: never

	/**
	 *
	 */
	export type Normalize<N extends DigitsStruct, R extends DigitsStruct = ['+', [], 0]> = [
		N[SIGN],
		N[DIGITS],
		N[EXPONENT]
	]
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
		: S extends `-1${infer L}`
		? [-1, ...FromString<L>]
		: S extends `-2${infer L}`
		? [-2, ...FromString<L>]
		: S extends `-3${infer L}`
		? [-3, ...FromString<L>]
		: S extends `-4${infer L}`
		? [-4, ...FromString<L>]
		: S extends `-5${infer L}`
		? [-5, ...FromString<L>]
		: S extends `-6${infer L}`
		? [-6, ...FromString<L>]
		: S extends `-7${infer L}`
		? [-7, ...FromString<L>]
		: S extends `-8${infer L}`
		? [-8, ...FromString<L>]
		: S extends `-9${infer L}`
		? [-9, ...FromString<L>]
		: S extends `-0${infer L}`
		? [-0, ...FromString<L>]
		: []
	export type ToString<A extends Array<number | string>> = number extends A['length']
		? ''
		: A['length'] extends 0
		? ''
		: `${A[0]}${ToString<Tail<A>>}`
}

// export namespace DigitsStruct {
// 	/**
// 	 * `S` is expected to be positive number.
// 	 *
// 	 * Either `12345` or `123.45`
// 	 */
// 	export type FromString<S extends string> = S extends `${infer W}.${infer F}`
// 		? NormalizeFloatingPoint<DigitsArray.FromString<W>, DigitsArray.FromString<F>>
// 		: [DigitsArray.FromString<S>, 0]

// 	export type NormalizeFloatingPoint<
// 		Sign extends '+' | '-',
// 		W extends number[],
// 		E extends number[],
// 		T extends number[] = [...W, ...E],
// 		Z extends number[] = E
// 	> = T extends [0, ...infer Tail extends number[]]
// 		? NormalizeFloatingPoint<Sign, W, E, Tail, Z>
// 		: [Sign, T, Z['length']]

// 	export type Normalize<N extends DigitsStruct, R extends DigitsStruct = [[], 0]> = [N[0], N[1]]

// 	/**
// 	 * Add `A` and `B` together.
// 	 *
// 	 * `A` and `B` must be normalized,
// 	 * meaning every digits are single-digit, i.e. -9 to 9.
// 	 *
// 	 * Normal `Add<A, B>` calls will not have negative
// 	 * Every resulting digits are 0 to 18.
// 	 */
// 	export type AddNormalized<A extends DigitsStruct, B extends DigitsStruct> = GetMinPadEnd<
// 		A[1],
// 		B[1]
// 	> extends [infer Pads extends number[], infer Longer]
// 		? Longer extends 'A'
// 			? AddNormalizedNumberArrayDevice<A[0], [...B[0], ...Pads], A[1]>
// 			: AddNormalizedNumberArrayDevice<[...A[0], ...Pads], B[0], B[1]>
// 		: never

// 	/**
// 	 * This is used to align the `NumberStruct` during `Add/Subtract`.
// 	 */
// 	export type GetMinPadEnd<
// 		A extends number,
// 		B extends number,
// 		R extends number[] = []
// 	> = R['length'] extends A ? [R, 'B'] : R['length'] extends B ? [R, 'A'] : GetMinPadEnd<A, B, [0, ...R]>

// 	export type SubtractNormalized<
// 		A extends DigitsStruct,
// 		B extends DigitsStruct,
// 		R extends DigitsStruct | unknown
// 	> = A

// 	export type ToString<N extends DigitsStruct> = PadStart<N[0], N[1], 0> extends infer Padded extends number[]
// 		? Padded['length'] extends N[1]
// 			? DigitsArray.ToString<[0, '.', ...Padded]>
// 			: SplitAt<Padded, ToNegative<N[1]>> extends [infer W extends number[], infer E extends number[]]
// 			? W extends []
// 				? E extends []
// 					? ''
// 					: DigitsArray.ToString<E>
// 				: DigitsArray.ToString<[...W, '.', ...E]>
// 			: never
// 		: never
// }

// export namespace DigitsArray {
// 	export type FromString<S extends string> = S extends `1${infer L}`
// 		? [1, ...FromString<L>]
// 		: S extends `2${infer L}`
// 		? [2, ...FromString<L>]
// 		: S extends `3${infer L}`
// 		? [3, ...FromString<L>]
// 		: S extends `4${infer L}`
// 		? [4, ...FromString<L>]
// 		: S extends `5${infer L}`
// 		? [5, ...FromString<L>]
// 		: S extends `6${infer L}`
// 		? [6, ...FromString<L>]
// 		: S extends `7${infer L}`
// 		? [7, ...FromString<L>]
// 		: S extends `8${infer L}`
// 		? [8, ...FromString<L>]
// 		: S extends `9${infer L}`
// 		? [9, ...FromString<L>]
// 		: S extends `0${infer L}`
// 		? [0, ...FromString<L>]
// 		: // : S extends `-1${infer L}`
// 		  // ? [-1, ...FromString<L>]
// 		  // : S extends `-2${infer L}`
// 		  // ? [-2, ...FromString<L>]
// 		  // : S extends `-3${infer L}`
// 		  // ? [-3, ...FromString<L>]
// 		  // : S extends `-4${infer L}`
// 		  // ? [-4, ...FromString<L>]
// 		  // : S extends `-5${infer L}`
// 		  // ? [-5, ...FromString<L>]
// 		  // : S extends `-6${infer L}`
// 		  // ? [-6, ...FromString<L>]
// 		  // : S extends `-7${infer L}`
// 		  // ? [-7, ...FromString<L>]
// 		  // : S extends `-8${infer L}`
// 		  // ? [-8, ...FromString<L>]
// 		  // : S extends `-9${infer L}`
// 		  // ? [-9, ...FromString<L>]
// 		  // : S extends `-0${infer L}`
// 		  // ? [-0, ...FromString<L>]
// 		  []

// 	export type ToString<A extends Array<number | string>> = number extends A['length']
// 		? ''
// 		: A['length'] extends 0
// 		? ''
// 		: `${A[0]}${ToString<Tail<A>>}`
// }

// type AddNormalizedNumberArrayDevice<
// 	A extends number[],
// 	B extends number[],
// 	E extends number,
// 	R extends number[] = []
// > = A extends []
// 	? B extends []
// 		? [R, E]
// 		: B extends [...infer BH extends number[], infer BL extends number]
// 		? AddNormalizedNumberArrayDevice<[], BH, E, [BL, ...R]>
// 		: never
// 	: B extends []
// 	? A extends [...infer AH extends number[], infer AL extends number]
// 		? AddNormalizedNumberArrayDevice<AH, [], E, [AL, ...R]>
// 		: never
// 	: [A, B] extends [
// 			[...infer AH extends number[], infer AL extends number],
// 			[...infer BH extends number[], infer BL extends number]
// 	  ]
// 	? AddNormalizedNumberArrayDevice<AH, BH, E, [IntegerEntryAdd<AL, BL>, ...R]>
// 	: never

// /**
//  * Adds two intger entries together.
//  *
//  * The first entry should always between `0` and `9`.
//  * The second entry can range from `-81` to `81`.
//  *
//  * The code needs to be adjusted if this is no longer true.
//  */
// export type IntegerEntryAdd<A extends number, B extends number> = `${A}` extends `-${infer AD extends number}`
// 	? `${B}` extends `-${infer BD extends number}`
// 		? ToNegative<PositiveEntryAdd<AD, BD>>
// 		: PositiveEntrySubtract<B, AD>
// 	: `${B}` extends `-${infer BD extends number}`
// 	? PositiveEntrySubtract<A, BD>
// 	: PositiveEntryAdd<A, B>

// export type PositiveEntryAdd<A extends number, B extends number> = [
// 	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
// 	[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
// 	[2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
// 	[3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
// 	[4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
// 	[5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
// 	[6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
// 	[7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
// 	[8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
// 	[9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
// 	[10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
// 	[11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
// 	[12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
// 	[13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
// 	[14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
// 	[15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
// 	[16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
// 	[17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
// 	[18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
// 	[19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
// 	[20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
// 	[21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
// 	[22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
// 	[23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
// 	[24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
// 	[25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
// 	[26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
// 	[27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
// 	[28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
// 	[29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
// 	[30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
// 	[31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
// 	[32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
// 	[33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
// 	[34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
// 	[35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
// 	[36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
// 	[37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
// 	[38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
// 	[39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
// 	[40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
// 	[41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
// 	[42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
// 	[43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
// 	[44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
// 	[45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
// 	[46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
// 	[47, 48, 49, 50, 51, 52, 53, 54, 55, 56],
// 	[48, 49, 50, 51, 52, 53, 54, 55, 56, 57],
// 	[49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
// 	[50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
// 	[51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
// 	[52, 53, 54, 55, 56, 57, 58, 59, 60, 61],
// 	[53, 54, 55, 56, 57, 58, 59, 60, 61, 62],
// 	[54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
// 	[55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
// 	[56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
// 	[57, 58, 59, 60, 61, 62, 63, 64, 65, 66],
// 	[58, 59, 60, 61, 62, 63, 64, 65, 66, 67],
// 	[59, 60, 61, 62, 63, 64, 65, 66, 67, 68],
// 	[60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
// 	[61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
// 	[62, 63, 64, 65, 66, 67, 68, 69, 70, 71],
// 	[63, 64, 65, 66, 67, 68, 69, 70, 71, 72],
// 	[64, 65, 66, 67, 68, 69, 70, 71, 72, 73],
// 	[65, 66, 67, 68, 69, 70, 71, 72, 73, 74],
// 	[66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
// 	[67, 68, 69, 70, 71, 72, 73, 74, 75, 76],
// 	[68, 69, 70, 71, 72, 73, 74, 75, 76, 77],
// 	[69, 70, 71, 72, 73, 74, 75, 76, 77, 78],
// 	[70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
// 	[71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
// 	[72, 73, 74, 75, 76, 77, 78, 79, 80, 81],
// 	[73, 74, 75, 76, 77, 78, 79, 80, 81, 82],
// 	[74, 75, 76, 77, 78, 79, 80, 81, 82, 83],
// 	[75, 76, 77, 78, 79, 80, 81, 82, 83, 84],
// 	[76, 77, 78, 79, 80, 81, 82, 83, 84, 85],
// 	[77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
// 	[78, 79, 80, 81, 82, 83, 84, 85, 86, 87],
// 	[79, 80, 81, 82, 83, 84, 85, 86, 87, 88],
// 	[80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
// 	[81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
// 	[82, 83, 84, 85, 86, 87, 88, 89, 90, 91],
// 	[83, 84, 85, 86, 87, 88, 89, 90, 91, 92],
// 	[84, 85, 86, 87, 88, 89, 90, 91, 92, 93],
// 	[85, 86, 87, 88, 89, 90, 91, 92, 93, 94],
// 	[86, 87, 88, 89, 90, 91, 92, 93, 94, 95],
// 	[87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
// 	[88, 89, 90, 91, 92, 93, 94, 95, 96, 97],
// 	[89, 90, 91, 92, 93, 94, 95, 96, 97, 98]
// ][A][B]

// /**
//  * Subtract two positive numbers.
//  * The number range from 0 to 81.
//  */
// export type PositiveEntrySubtract<A extends number, B extends number> = [`${A}`, `${B}`] extends [
// 	`${infer A1 extends number}${infer A2 extends number}`,
// 	`${infer B1 extends number}${infer B2 extends number}`
// ]
// 	? PositiveEntrySubtract<A2, B2>
// 	: `${A}` extends `${infer A1 extends number}${infer A2 extends number}`
// 	? PositiveEntrySubtract<A2, B>
// 	: `${B}` extends `${infer B1 extends number}${infer B2 extends number}`
// 	? PositiveEntrySubtract<A, B2>
// 	: SingleDigitSubtract<A, B>

// export type SingleDigitSubtract<A extends number, B extends number> = [
// 	[0, -1, -2, -3, -4, -5, -6, -7, -8, -9],
// 	[1, 0, -1, -2, -3, -4, -5, -6, -7, -8],
// 	[2, 1, 0, -1, -2, -3, -4, -5, -6, -7],
// 	[3, 2, 1, 0, -1, -2, -3, -4, -5, -6],
// 	[4, 3, 2, 1, 0, -1, -2, -3, -4, -5],
// 	[5, 4, 3, 2, 1, 0, -1, -2, -3, -4],
// 	[6, 5, 4, 3, 2, 1, 0, -1, -2, -3],
// 	[7, 6, 5, 4, 3, 2, 1, 0, -1, -2],
// 	[8, 7, 6, 5, 4, 3, 2, 1, 0, -1],
// 	[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
// ][A][B]

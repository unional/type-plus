import type { Digit } from './Digit.js'
import type { MathDeviceToNumeric, NumericToMathDevice } from './cast.js'
import type { MathDevice } from './math_device.js'

/**
 * Add two number literals.
 */
export type Add<A extends number | bigint, B extends number | bigint, Fail = never> = [
	NumericToMathDevice<A>,
	NumericToMathDevice<B>
] extends [infer MA extends MathDevice, infer MB extends MathDevice]
	? [MA[0], MB[3]] extends ['bigint', undefined | []]
		? [MA[1], MB[1]] extends ['+', '+'] | ['-', '-']
			? MathDeviceToNumeric<['bigint', MA[1], AddDevice<MA[2], MB[2], []>]>
			: MathDeviceToNumeric<['bigint', MA[1], SubtractDevice<MA[2], MB[2], []>]>
		: 'Cannot add a non-integer to a bigint'
	: never

type AddDevice<A extends number[], B extends number[], R extends number[]> = A['length'] extends 0
	? B['length'] extends 0
		? R
		: B extends [...infer BH extends number[], infer BL extends number]
		? AddDevice<[], BH, [BL, ...R]>
		: never
	: B['length'] extends 0
	? A extends [...infer AH extends number[], infer AL extends number]
		? AddDevice<AH, [], [AL, ...R]>
		: never
	: [A, B] extends [
			[...infer AH extends number[], infer AL extends number],
			[...infer BH extends number[], infer BL extends number]
	  ]
	? AddDevice<AH, BH, [MathDevice.IntegerEntryAdd<AL, BL>, ...R]>
	: never

type R = AddDevice<[1, 0], [-1], []>
type S = MathDeviceToNumeric<['bigint', '+', [1, -1]]>

type SubtractDevice<A extends number[], B extends number[], R extends number[]> = A['length'] extends 0
	? B['length'] extends 0
		? R
		: B extends [...infer BH extends number[], infer BL extends number]
		? AddDevice<[], BH, [MathDevice.PositiveEntrySubtract<0, BL>, ...R]>
		: never
	: B['length'] extends 0
	? A extends [...infer AH extends number[], infer AL extends number]
		? AddDevice<AH, [], [AL, ...R]>
		: never
	: [A, B] extends [
			[...infer AH extends number[], infer AL extends number],
			[...infer BH extends number[], infer BL extends number]
	  ]
	? AddDevice<AH, BH, [MathDevice.PositiveEntrySubtract<AL, BL>, ...R]>
	: never

// [
// 	StringToMathDevice<`${A}`>,
// 	StringToMathDevice<`${B}`>
// ] extends [infer MA extends MathDevice, infer MB extends MathDevice]
// 	? [MA[1], MB[1]] extends ['+', '+'] | ['-', '-']
// 		? 1
// 		: 2
// 	: never
// And<
// 	And<IsPositive<A>, IsInteger<A>>,
// 	And<IsPositive<B>, IsInteger<B>>
// > extends false
// 	? Fail
// 	: DigitArray.FromNumber<A> extends infer DA extends number[]
// 	? DigitArray.FromNumber<B> extends infer DB extends number[]
// 		? Max<DA['length'], DB['length']> extends infer M extends number
// 			? PadLeft<DA, M, 0> extends infer PDA extends number[]
// 				? PadLeft<DB, M, 0> extends infer PDB extends number[]
// 					? DigitArray.ToNumber<Add.DigitArray<PDA, PDB>>
// 					: Fail
// 				: Fail
// 			: Fail
// 		: Fail
// 	: Fail

export namespace Add {
	export type DigitArray<A extends number[], B extends number[]> = A extends [any, ...infer ATail]
		? ATail extends number[]
			? B extends [any, ...infer BTail]
				? BTail extends number[]
					? [Digit<A[0], B[0]>, ...DigitArray<ATail, BTail>]
					: []
				: [A[0], ...DigitArray<[], ATail>]
			: []
		: B extends [any, ...infer BTail]
		? BTail extends number[]
			? [B[0], ...DigitArray<[], BTail>]
			: []
		: []

	export type Digit<A extends number, B extends number> = [...Digit.ToTuple[A], ...Digit.ToTuple[B]]['length']
}

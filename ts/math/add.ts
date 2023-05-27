import {
	MathStruct,
	NormalizeMathStruct,
	NormalizedMathStructToNumeric,
	NumericToMathStruct
} from './math_struct.js'

import { DigitsStruct } from './digit_struct.js'

export type Add<A extends number | bigint, B extends number | bigint, Fail = never> = [
	NumericToMathStruct<A>,
	NumericToMathStruct<B>
] extends [infer MA extends MathStruct, infer MB extends MathStruct]
	? [MA[1], MB[1]] extends ['+', '+']
		? NormalizedMathStructToNumeric<
				NormalizeMathStruct<[MA[0], '+', DigitsStruct.AddNormalized<MA[2], MB[2]>]>
		  >
		: [MA[1], MB[1]] extends ['+', '-']
		? NormalizedMathStructToNumeric<
				NormalizeMathStruct<[MA[0], '+', DigitsStruct.SubtractNormalized<MA[2], MB[2], []>]>
		  >
		: [MA[1], MB[1]] extends ['-', '+']
		? NormalizedMathStructToNumeric<
				NormalizeMathStruct<[MA[0], '+', DigitsStruct.SubtractNormalized<MB[2], MA[2], []>]>
		  >
		: NormalizedMathStructToNumeric<
				NormalizeMathStruct<[MA[0], '-', DigitsStruct.AddNormalized<MA[2], MB[2]>]>
		  >
	: never

export type Subtract<A extends number | bigint, B extends number | bigint, Fail = never> = [
	NumericToMathStruct<A>,
	NumericToMathStruct<B>
] extends [infer MA extends MathStruct, infer MB extends MathStruct]
	? [MA[1], MB[1]] extends ['+', '+']
		? NormalizedMathStructToNumeric<
				NormalizeMathStruct<[MA[0], '+', DigitsStruct.SubtractNormalized<MA[2], MB[2], []>]>
		  >
		: [MA[1], MB[1]] extends ['+', '-']
		? NormalizedMathStructToNumeric<
				NormalizeMathStruct<[MA[0], '+', DigitsStruct.AddNormalized<MA[2], MB[2]>]>
		  >
		: [MA[1], MB[1]] extends ['-', '+']
		? NormalizedMathStructToNumeric<
				NormalizeMathStruct<[MA[0], '-', DigitsStruct.AddNormalized<MA[2], MB[2]>]>
		  >
		: NormalizedMathStructToNumeric<
				NormalizeMathStruct<[MA[0], '+', DigitsStruct.SubtractNormalized<MB[2], MA[2], []>]>
		  >
	: never

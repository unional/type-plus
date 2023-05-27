import {
	MathStruct,
	NormalizeMathStruct,
	NormalizedMathStructToNumeric,
	NumericToMathStruct
} from './math_struct.js'

import { AddNormalizedNumberStruct, SubtractDevice } from './math_struct.number_struct.js'

export type Add<A extends number | bigint, B extends number | bigint, Fail = never> = [
	NumericToMathStruct<A>,
	NumericToMathStruct<B>
] extends [infer MA extends MathStruct, infer MB extends MathStruct]
	? [MA[1], MB[1]] extends ['+', '+']
		? NormalizedMathStructToNumeric<
				NormalizeMathStruct<[MA[0], '+', AddNormalizedNumberStruct<MA[2], MB[2]>]>
		  >
		: [MA[1], MB[1]] extends ['+', '-']
		? NormalizedMathStructToNumeric<NormalizeMathStruct<[MA[0], '+', SubtractDevice<MA[2], MB[2], []>]>>
		: [MA[1], MB[1]] extends ['-', '+']
		? NormalizedMathStructToNumeric<NormalizeMathStruct<[MA[0], '+', SubtractDevice<MB[2], MA[2], []>]>>
		: NormalizedMathStructToNumeric<
				NormalizeMathStruct<[MA[0], '-', AddNormalizedNumberStruct<MA[2], MB[2]>]>
		  >
	: never

export type Subtract<A extends number | bigint, B extends number | bigint, Fail = never> = [
	NumericToMathStruct<A>,
	NumericToMathStruct<B>
] extends [infer MA extends MathStruct, infer MB extends MathStruct]
	? [MA[1], MB[1]] extends ['+', '+']
		? NormalizedMathStructToNumeric<NormalizeMathStruct<[MA[0], '+', SubtractDevice<MA[2], MB[2], []>]>>
		: [MA[1], MB[1]] extends ['+', '-']
		? NormalizedMathStructToNumeric<
				NormalizeMathStruct<[MA[0], '+', AddNormalizedNumberStruct<MA[2], MB[2]>]>
		  >
		: [MA[1], MB[1]] extends ['-', '+']
		? NormalizedMathStructToNumeric<
				NormalizeMathStruct<[MA[0], '-', AddNormalizedNumberStruct<MA[2], MB[2]>]>
		  >
		: NormalizedMathStructToNumeric<NormalizeMathStruct<[MA[0], '+', SubtractDevice<MB[2], MA[2], []>]>>
	: never

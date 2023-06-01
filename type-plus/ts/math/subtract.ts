import type { NumericStruct } from './numeric_struct.js'

export type Subtract<A extends number | bigint, B extends number | bigint, Fail = never> = [
	NumericStruct.FromNumeric<A, Fail>,
	NumericStruct.FromNumeric<B, Fail>
] extends [infer MA, infer MB]
	? MA extends NumericStruct
		? MB extends NumericStruct
			? NumericStruct.ToNumeric<NumericStruct.Subtract<MA, MB>>
			: Fail
		: Fail
	: never

export type Decrement<N extends number | bigint> = Subtract<N, 1>

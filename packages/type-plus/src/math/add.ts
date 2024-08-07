import type { NumericStruct } from './numeric_struct.js'

export type Add<A extends number | bigint, B extends number | bigint, Fail = never> = [
	NumericStruct.FromNumeric<A, Fail>,
	NumericStruct.FromNumeric<B, Fail>,
] extends [infer MA, infer MB]
	? MA extends NumericStruct
		? MB extends NumericStruct
			? NumericStruct.ToNumeric<NumericStruct.Add<MA, MB>>
			: Fail
		: Fail
	: never

export type Increment<N extends number | bigint> = Add<N, 1>

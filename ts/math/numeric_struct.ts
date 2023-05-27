import type { DigitsStruct } from './digit_struct.js'

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
export type NumericStruct = ['bigint' | 'number', '+' | '-', DigitsStruct]

export namespace NumericStruct {
	export type FromNumeric<N extends number | bigint> = N extends number
		? FromNumber<N>
		: N extends bigint
		? FromBigint<N>
		: never
	export type FromNumber<N extends number> = `${N}` extends `-${infer R}`
		? ['number', '-', DigitsStruct.FromString<R>]
		: ['number', '+', DigitsStruct.FromString<`${N}`>]
	export type FromBigint<N extends bigint> = `${N}` extends `-${infer R}`
		? ['bigint', '-', DigitsStruct.FromString<R>]
		: ['bigint', '+', DigitsStruct.FromString<`${N}`>]
	export type NormalizedToNumeric<M extends NumericStruct, Fail = never> = NormalizedToBigint<
		M,
		NormalizedToNumber<M, Fail>
	>
	type NormalizedToBigint<M extends NumericStruct, Fail = never> = M[0] extends 'bigint'
		? M[1] extends '+'
			? StringToBigint<DigitsStruct.ToString<M[2]>, Fail>
			: M[2] extends [[0], 0, 0]
			? 0n
			: StringToBigint<`-${DigitsStruct.ToString<M[2]>}`, Fail>
		: Fail
	type NormalizedToNumber<M extends NumericStruct, Fail = never> = M[1] extends '+'
		? StringToNumber<DigitsStruct.ToString<M[2]>, Fail>
		: M[2] extends [[0], 0, 0]
		? 0
		: StringToNumber<`-${DigitsStruct.ToString<M[2]>}`, Fail>

	export type Normalize<M extends NumericStruct> = [M[0], M[1], DigitsStruct.Normalize<M[2]>]
}

type StringToBigint<S extends string, Fail> = S extends `${infer N extends bigint}` ? N : Fail

export type StringToNumber<S extends string, Fail> = S extends `${infer N extends number}`
	? number extends N
		? StringToBigint<S, Fail>
		: N
	: Fail

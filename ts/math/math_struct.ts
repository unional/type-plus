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
export type MathStruct = ['bigint' | 'number', '+' | '-', DigitsStruct]

export type NumericToMathStruct<N extends number | bigint> = N extends number
	? NumberToMathStruct<N>
	: N extends bigint
	? BigintToMathStruct<N>
	: never

export type NumberToMathStruct<N extends number> = `${N}` extends `-${infer R}`
	? ['number', '-', DigitsStruct.FromString<R>]
	: ['number', '+', DigitsStruct.FromString<`${N}`>]

export type BigintToMathStruct<N extends bigint> = `${N}` extends `-${infer R}`
	? ['bigint', '-', DigitsStruct.FromString<R>]
	: ['bigint', '+', DigitsStruct.FromString<`${N}`>]

export type NormalizedMathStructToNumeric<M extends MathStruct, Fail = never> = NormalizedMathStructToBigint<
	M,
	NormalizedMathStructToNumber<M, Fail>
>

type NormalizedMathStructToBigint<M extends MathStruct, Fail = never> = M[0] extends 'bigint'
	? M[1] extends '+'
		? StringToBigint<DigitsStruct.ToString<M[2]>, Fail>
		: M[2] extends [[0], 0, 0]
		? 0n
		: StringToBigint<`-${DigitsStruct.ToString<M[2]>}`, Fail>
	: Fail

type StringToBigint<S extends string, Fail> = S extends `${infer N extends bigint}` ? N : Fail

type NormalizedMathStructToNumber<M extends MathStruct, Fail = never> = M[1] extends '+'
	? StringToNumber<DigitsStruct.ToString<M[2]>, Fail>
	: M[2] extends [[0], 0, 0]
	? 0
	: StringToNumber<`-${DigitsStruct.ToString<M[2]>}`, Fail>

export type StringToNumber<S extends string, Fail> = S extends `${infer N extends number}`
	? number extends N
		? StringToBigint<S, Fail>
		: N
	: Fail

export type NormalizeMathStruct<M extends MathStruct> = [M[0], M[1], DigitsStruct.Normalize<M[2]>]

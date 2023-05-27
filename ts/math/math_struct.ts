import type { SplitAt } from '../array/array_plus.split_at.js'
import type { Tail } from '../array/tail.js'
import type { PadStart } from '../tuple/tuple_plus.pad_start.js'
import type { ToNegative } from './math_plus.to_negative.js'
import type { NormalizeNumberStruct, NumberStruct, StringToNumberStruct } from './math_struct.number_struct.js'

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

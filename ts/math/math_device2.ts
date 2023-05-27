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
export type NumberStruct = [number[], number]

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
	: [StringToNumberArray<S>, 0]

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
> = T extends [0, ...infer Tail extends number[]] ? NormalizeFloatingPoint<W, E, Tail, Z> : [T, Z['length']]

export type NormalizedMathStructToNumeric<M extends MathStruct, Fail = never> = NormalizedMathStructToBigint<
	M,
	NormalizedMathStructToNumber<M, Fail>
>

type NormalizedMathStructToBigint<M extends MathStruct, Fail = never> = M[0] extends 'bigint'
	? M[1] extends '+'
		? StringToBigint<NumberStructToString<M[2]>, Fail>
		: M[2] extends [[0], 0]
		? 0n
		: StringToBigint<`-${NumberStructToString<M[2]>}`, Fail>
	: Fail

type StringToBigint<S extends string, Fail> = S extends `${infer N extends bigint}` ? N : Fail

type NormalizedMathStructToNumber<M extends MathStruct, Fail = never> = M[1] extends '+'
	? NumberStructToString<M[2]> extends `${infer N extends number}`
		? number extends N ? StringToBigint<NumberStructToString<M[2]>, Fail> : N
		: Fail
	: M[2] extends [[0], 0]
	? 0
	: `-${NumberStructToString<M[2]>}` extends `${infer N extends number}`
	? number extends N ? StringToBigint<`-${NumberStructToString<M[2]>}`, Fail> : N
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

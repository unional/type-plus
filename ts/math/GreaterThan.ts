import type { Head, PadStart, Tail } from '../array/index.js'
import type { IsEqual } from '../equal/equal.js'
import type { IsInteger } from '../numeric/integer.js'
import type { IsPositive } from '../numeric/positive.js'
import type { And, Or, Xor } from '../predicates/index.js'
import type { Digit, DigitArray } from './Digit.js'
import type { Max } from './Max.js'

export type GreaterThan<A extends number | bigint, B extends number | bigint, Fail = never> = And<
	IsInteger<A>,
	IsInteger<B>
> extends false
	? Fail
	: number extends A
	? Fail
	: number extends B
	? Fail
	: IsEqual<A, B> extends true
	? false
	: Xor<IsPositive<A>, IsPositive<B>> extends true
	? IsPositive<A>
	: Or<IsPositive<A>, IsPositive<B>> extends false
	? GreaterThan.ForWholeNumber<B, A>
	: GreaterThan.ForWholeNumber<A, B>

export namespace GreaterThan {
	export type ForWholeNumber<
		A extends number | bigint,
		B extends number | bigint
	> = DigitArray.FromNumberAbs<A> extends infer DA extends number[]
		? DigitArray.FromNumberAbs<B> extends infer DB extends number[]
			? Max<DA['length'], DB['length']> extends infer M extends number
				? PadStart<DA, M, 0> extends infer PDA extends number[]
					? PadStart<DB, M, 0> extends infer PDB extends number[]
						? ForDigitArray<PDA, PDB>
						: never
					: never
				: never
			: never
		: never

	export type ForDigitArray<DA extends number[], DB extends number[]> = IsEqual<
		Head<DA>,
		Head<DB>
	> extends true
		? ForDigitArray<Tail<DA>, Tail<DB>>
		: Digit.GreaterThan<Head<DA>, Head<DB>>
}

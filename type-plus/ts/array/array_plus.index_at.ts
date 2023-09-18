import type { IsAny } from '../any/is_any.js'
import type { IsEqual } from '../equal/equal.js'
import type { Abs } from '../math/abs.js'
import type { GreaterThan } from '../math/greater_than.js'
import type { Subtract } from '../math/subtract.js'
import type { IsNever } from '../never/is_never.js'
import type { StrictNumberType } from '../number/strict_number_type.js'
import type { Integer } from '../numeric/integer.js'
import type { Negative } from '../numeric/negative.js'

/**
 * 🦴 *utilities*
 *
 * Gets the normalized index to access the element of an array or tuple.
 *
 * @example
 * ```ts
 * type R = IndexAt<['a', 'b', 'c'], 2> // 2
 * type R = IndexAt<['a', 'b', 'c'], -2> // 1
 *
 * type R = IndexAt<['a', 'b', 'c'], 3> // never
 * type R = IndexAt<['a', 'b', 'c'], -4> // never
 * ```
 */
export type IndexAt<
	A extends readonly unknown[],
	N extends number,
	Fail = never,
	Upper = A['length'],
	Lower = 0
> = IsNever<A, { $then: Fail, $else: IndexAt._<A, N, Fail, Upper, Lower> }>

export namespace IndexAt {
	export type _<
		A extends readonly unknown[],
		N extends number,
		Fail = never,
		Upper = A['length'],
		Lower = 0
	> = IsEqual<
		A['length'],
		0,
		Fail,
		Integer<
			N,
			StrictNumberType<
				A['length'],
				// A: array
				N,
				// A: tuple
				Negative<
					N,
					GreaterThan<Abs<N>, A['length']> extends true ? Lower : Subtract<A['length'], Abs<N>>,
					GreaterThan<A['length'], N> extends true ? N : Upper
				>
			>,
			// N: number or float
			IsAny<
				N,
				{
					$then: number,
					$else: StrictNumberType<
						N,
						// TODO: handle tuple to union of indexes
						N
					>
				}
			>
		>
	>
}

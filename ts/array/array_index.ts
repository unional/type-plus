import type { IsAny } from '../any/any_type.js'
import type { IsEqual } from '../equal/equal.js'
import type { Abs } from '../math/Abs.js'
import type { GreaterThan } from '../math/GreaterThan.js'
import type { Subtract } from '../math/Subtract.js'
import type { IsNever } from '../never/never_type.js'
import type { Integer } from '../numeric/integer.js'
import type { Negative } from '../numeric/negative.js'
import type { StrictNumberType } from '../number/strict_number_type.js'

/**
 * Gets the normalized index to access the element of an array or tuple.
 *
 * ```ts
 * type R = IndexAt<['a', 'b', 'c'], 2> // 2
 * type R = IndexAt<['a', 'b', 'c'], -2> // 1
 *
 * type R = IndexAt<['a', 'b', 'c'], 3> // never
 * type R = IndexAt<['a', 'b', 'c'], -4> // never
 * ```
 */
export type IndexAt<A extends Array<unknown>, N extends number, Fail = never> = IsEqual<
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
				GreaterThan<Abs<N>, A['length']> extends true ? Fail : Subtract<A['length'], Abs<N>>,
				GreaterThan<A['length'], N> extends true ? N : Fail
			>
		>,
		// N: number or float
		IsAny<
			N,
			number,
			StrictNumberType<
				N,
				// TODO: handle tuple to union of indexes
				N
			>
		>
	>
>

/**
 * Is N an out of bound index of A.
 *
 * ```ts
 * type R = IsIndexOutOfBound<[1], 0> // false
 * type R = IsIndexOutOfBound<[1], -1> // false

 * type R = IsIndexOutOfBound<[1], 1> // true
 * type R = IsIndexOutOfBound<[1], -2> // true
 * ```
 */
export type IsIndexOutOfBound<A extends unknown[], N extends number, Then = true, Else = false> = IsNever<
	IndexAt<A, N>,
	Then,
	Else
>

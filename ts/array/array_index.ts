import type { IsAny } from '../any/any_type.js'
import type { Abs } from '../math/Abs.js'
import type { GreaterThan } from '../math/GreaterThan.js'
import type { Subtract } from '../math/Subtract.js'
import type { IsNever } from '../never/never_type.js'
import type { Integer, Negative } from '../number/number.js'
import { NumberType } from '../number/number_type.js'
import type { Equal } from '../predicates/Equal.js'

/**
 * Gets the normalized index to access the element of an array or tuple.
 *
 * ```
 * import type { ArrayPlus } from 'type-plus'
 *
 * type R = ArrayPlus.IndexAt<['a', 'b', 'c'], 2> // 2
 * type R = ArrayPlus.IndexAt<['a', 'b', 'c'], -2> // 1
 *
 * type R = ArrayPlus.IndexAt<['a', 'b', 'c'], 3> // never
 * type R = ArrayPlus.IndexAt<['a', 'b', 'c'], -4> // never
 * ```
 */
export type IndexAt<A extends Array<unknown>, N extends number, Fail = never> = Equal<
	A['length'],
	0,
	Fail,
	Integer<
		N,
		NumberType<
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
			NumberType<
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
 * ```
 * import { IsIndexOutOfBound } from 'type-plus'
 *
 * type R = IsIndexOutOfBound<[1], 0> // false
 * type R = IsIndexOutOfBound<[1], -1> // false

 * type R = IsIndexOutOfBound<[1], 1> // true
 * type R = IsIndexOutOfBound<[1], -2> // true
 */
export type IsIndexOutOfBound<A extends unknown[], N extends number, Then = true, Else = false> = IsNever<
	IndexAt<A, N>,
	Then,
	Else
>

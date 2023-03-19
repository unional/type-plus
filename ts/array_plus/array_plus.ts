import { IsNever } from '../PrimitiveTypes.js'
import type { Abs } from '../math/Abs.js'
import type { GreaterThan } from '../math/GreaterThan.js'
import type { Subtract } from '../math/Subtract.js'
import type { Integer, Negative, NumberType } from '../number_plus/number.js'
import { Equal } from '../predicates/Equal.js'

export type * from './array.js'

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
		NumberType<
			N,
			// TODO: handle tuple to union of indexes
			N,
			Fail
		>
	>
>

/**
 * Is N an out of bound index of A.
 */
export type IndexOutOfBound<A extends unknown[], N extends number> = IsNever<IndexAt<A, N>>

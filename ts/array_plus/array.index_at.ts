import type { GreaterThan } from '../index.js'
import type { Abs } from '../math/Abs.js'
import type { Subtract } from '../math/Subtract.js'
import type { Integer, Negative } from '../number_plus/number.js'

/**
 * Gets the normalized index to access the element of an array or tuple.
 *
 * ```
 * import type { ArrayPlus } from 'type-plus'
 *
 * type R = ArrayPlus.IndexAt<['a', 'b', 'c'], 0> // 0
 * type R = ArrayPlus.IndexAt<['a', 'b', 'c'], 1> // 1
 * type R = ArrayPlus.IndexAt<['a', 'b', 'c'], -1> // 2
 * type R = ArrayPlus.IndexAt<['a', 'b', 'c'], -2> // 1
 * type R = ArrayPlus.IndexAt<['a', 'b', 'c'], -3> // 0
 * type R = ArrayPlus.IndexAt<['a', 'b', 'c'], 3> // never
 * type R = ArrayPlus.IndexAt<['a', 'b', 'c'], -4> // never
 * ```
 */
export type IndexAt<A extends Array<unknown>, N extends number> = Integer<
	N,
	Negative<
		N,
		GreaterThan<Abs<N>, A['length']> extends true ? never : Subtract<A['length'], Abs<N>>,
		GreaterThan<A['length'], N> extends true ? N : never
	>,
	never
>

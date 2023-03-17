import type { Abs } from '../math/Abs.js'
import type { GreaterThan } from '../math/GreaterThan.js'
import type { Subtract } from '../math/Subtract.js'
import type { Negative } from '../number_plus/number.js'

/**
 * Gets the type of the array or tuple at index `N`.
 *
 * Like `Array.at()`, this type supports negative numbers.
 *
 * @alias ArrayPlus.At
 *
 * ```
 * import type { AtArray } from 'type-plus'
 *
 * type R = AtArray<[1, 2, 3], -1> // 3
 * ```
 */
export type AtArray<A extends Array<unknown>, N extends number> = A['length'] extends 0
	? never
	: number extends A['length']
	? A[N]
	: GreaterThan<Abs<N>, A['length']> extends true
	? undefined
	: Negative<N, A[Subtract<A['length'], Abs<N>>], A[N]>

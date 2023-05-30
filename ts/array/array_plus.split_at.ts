import type { IndexAt } from './array_index.js'
import { ArrayType } from './array_type.js'

/**
 * Splits an array into two at the specified `Index`.
 *
 * If the `Index` is out of bounds,
 * it will set to the boundary value, similar to `array.splice()`.
 *
 * @example
 * ```ts
 * SplitAt<[1, 2, 3, 4, 5], 0> // [[], [1, 2, 3, 4, 5]]
 * SplitAt<[1, 2, 3, 4, 5], -5> // [[], [1, 2, 3, 4, 5]]
 *
 * SplitAt<[1, 2, 3, 4, 5], 2> // [[1, 2], [3, 4, 5]]
 *
 * SplitAt<[1, 2, 3, 4, 5], 4> // [[1, 2, 3, 4], [5]]
 * SplitAt<[1, 2, 3, 4, 5], -1> // [[1, 2, 3, 4], [5]]
 *
 * SplitAt<[1, 2, 3, 4, 5], 5> // [[1, 2, 3, 4, 5], []]
 *
 * // out of bound resets to boundary
 * SplitAt<[1, 2, 3, 4, 5], 6> // [[1, 2, 3, 4, 5], []]
 * SplitAt<[1, 2, 3, 4, 5], -6> // [[], [1, 2, 3, 4, 5]]
 * ```
 */
export type SplitAt<A extends unknown[], Index extends number> = ArrayType<
	A,
	[A, A],
	ArraySplitAtDevice<A, [], IndexAt<A, Index>>
>

/**
 * Splits an array into two at the specified `Index`.
 * The device does not work on negative index nor out of bound index.
 */
export type ArraySplitAtDevice<
	A extends unknown[],
	B extends unknown[],
	Index extends number
> = Index extends B['length']
	? [B, A]
	: A extends [infer Head, ...infer Tail]
	? ArraySplitAtDevice<Tail, [...B, Head], Index>
	: never

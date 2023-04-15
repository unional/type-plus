import type { IndexAt } from './array_index.js'

/**
 * Gets the type of the array or tuple at index `N`.
 *
 * Like `Array.at()`, this type supports negative numbers.
 *
 * @alias ArrayPlus.At
 * @see https://github.com/microsoft/TypeScript/issues/53345#issuecomment-1477138167
 *
 * ```ts
 * type R = At<[1, 2, 3], 2> // 3
 * type R = At<[1, 2, 3], -1> // 3
 * ```
 */
export type At<A extends unknown[], N extends number, Fail = never> = IndexAt<A, N, Fail> extends infer I
	? I extends number
		? A[I]
		: Fail
	: never

/**
 * Concats two arrays.
 *
 * alias of: `[...A, ...B]`
 *
 * @alias ArrayPlus.Concat
 *
 * ```ts
 * type R = Concat<[1], [2, 3]> // [1, 2, 3]
 * ```
 */
export type Concat<A extends unknown[], B extends unknown[]> = [...A, ...B]

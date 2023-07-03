/**
 * 🦴 *utilities
 * 💀 *deprecated* Will be available only as `ArrayPlus.Concat` in the next version
 *
 * Concats two arrays or tuples.
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

import type { IsTuple } from '../tuple/tuple_type.js'
/**
 * Returns an array of key-value pairs for every entry in the array or tuple.
 *
 * Note that this is not the same as `Array.entries(A)`,
 * which returns an iterable interator.
 *
 * @example
 * ```ts
 * ArrayPlus.Entries<Array<string | number>> // Array<[number, string | number]>
 * ArrayPlus.Entries<[1, 2, 3]> // [[0, 1], [1, 2], [2, 3]]
 * ```
 */
export type Entries<A extends unknown[]> = IsTuple<
	A,
	Entries.Device<A, []>,
	A extends Array<infer T> ? Array<[number, T]> : never
>

export namespace Entries {
	export type Device<A extends unknown[], R extends unknown[]> = A['length'] extends 0
	? R
	: A extends [...infer F, infer N]
	? Device<F, [[F['length'], N], ...R]>
	: never
}

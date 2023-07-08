import type { IsStrictNumber } from '../number/strict_number_type.js'
import type { TupleType } from '../tuple/tuple_type.js'
import type { IndexAt } from './array_plus.index_at.js'

/**
 * 🦴 *utilities*
 *
 * Gets the type of the array or tuple at positive or negative index `N`.
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
export type At<A extends unknown[], N extends number, Fail = never> = IndexAt<
	A,
	N,
	Fail,
	Fail,
	Fail
> extends infer I
	? I extends number
		? TupleType<A, IsStrictNumber<I, A[I] | undefined, A[I]>, A[I] | undefined>
		: Fail
	: never

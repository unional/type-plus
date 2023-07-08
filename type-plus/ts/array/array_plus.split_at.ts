import type { NeverType } from '../never/never_type.js'
import type { IsTuple } from '../tuple/tuple_type.js'
import type { IndexAt } from './array_plus.index_at.js'
import type { ArrayType } from './array_type.js'

/**
 * ⚗️ *transform*
 *
 * Splits array or tuple `A` into two at the specified `Index`.
 *
 * If the `Index` is out of bounds,
 * it will set to the boundary value.
 *
 * It is the type level `splice()`.
 *
 * @example
 * ```ts
 * SplitAt<[1, 2, 3, 4, 5], 2> // [[1, 2], [3, 4, 5]]
 * SplitAt<[1, 2, 3, 4, 5], -3> // [[1, 2], [3, 4, 5]]
 *
 * SplitAt<[1, 2, 3, 4, 5], 2, 2> // [[1, 2, 5], [3, 4]]
 *
 * SplitAt<[1, 2, 3, 4, 5], 2, 2, ['a', 'b']> // [[1, 2, 'a', 'b', 5], [3, 4]]
 *
 * // out of bound resets to boundary
 * SplitAt<[1, 2, 3, 4, 5], 6> // [[1, 2, 3, 4, 5], []]
 * SplitAt<[1, 2, 3, 4, 5], -6> // [[], [1, 2, 3, 4, 5]]
 * ```
 */
export type SplitAt<
	A extends unknown[],
	Index extends number,
	DeleteCount extends number | never = never,
	Insert extends unknown[] | never = never
> = ArrayType<
	A,
	[A, A],
	SplitAt._<A, [], [], IndexAt._<A, Index>, DeleteCount, Insert>
>

export namespace SplitAt {
	export type _<
		A extends unknown[],
		B extends unknown[],
		C extends unknown[],
		Index extends number,
		DeleteCount,
		Insert extends unknown[],
	> = 0 extends A['length']
		? IsTuple<Insert, [[...Insert, ...B], C], [B, C]>
		: (Index extends B['length']
			? NeverType<
				DeleteCount,
				[B, A],
				_D<A, B, C, DeleteCount, Insert>>
			: (A extends [infer Head, ...infer Tail]
				? _<Tail, [...B, Head], [], Index, DeleteCount, Insert>
				: 'unexpected: A does not extends [Head, ...Tail]'))

	export type _D<
		A extends unknown[],
		B extends unknown[],
		C extends unknown[],
		DeleteCount,
		Insert extends unknown[],
	> = DeleteCount extends C['length']
		? IsTuple<Insert, [[...B, ...Insert, ...A], C], [[...B, ...A], C]>
		: (A extends [infer Head, ...infer Tail]
			? _D<Tail, B, [...C, Head], DeleteCount, Insert>
			: IsTuple<Insert, [[...Insert, ...B], C], [B, C]>
		)

}


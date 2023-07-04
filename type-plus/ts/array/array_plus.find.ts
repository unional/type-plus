import type { IsNever } from '../never/never_type.js'
import type { TupleType } from '../tuple/tuple_type.js'
import type { IsUnion } from '../union/union.js'

/**
 * 🦴 *utilities*
 *
 * Finds the type in array `A` that matches the `Criteria`.
 *
 * @typeParam Cases['never'] return type when `A` is `never`. Default to `never`.
 * @typeParam Cases['tuple'] return type when `A` is a tuple. Default to `not supported` message.
 * @typeParam Cases['widen'] return type when `T` in `A` is a widen type of `Criteria`.
 * Default to `Criteria | undefined`.
 * Set it to `never` for a more type-centric behavior
 * @typeParam Cases['union_miss'] additional type to return when `T` in `A` is a union type,
 * and it partially match `Criteria`.
 * Meaning this type represent the case when the `Criteria` is not met.
 * Default to `undefined`.
 *
 * @example
 * ```ts
 * ArrayPlus.Find<Array<string>, string> // string
 * ArrayPlus.Find<Array<string | number>, string> // string | undefined
 * ArrayPlus.Find<Array<number>, 1> // 1 | undefined
 *
 * ArrayPlus.Find<Array<number>, string> // never
 * ```
 */
export type Find<A extends unknown[], Criteria, Cases extends {
	never?: unknown,
	tuple?: unknown,
	widen?: unknown,
	union_miss?: unknown
} = {
	never: never,
	tuple: 'does not support tuple. Please use `FindFirst` or `TuplePlus.Find` instead.',
	widen: Criteria | undefined,
	union_miss: undefined
}> =
	TupleType<
		A,
		Cases['tuple'],
		A extends Array<infer T>
		? ([T] extends [Criteria]
			? T
			: ((T extends Criteria
				? T
				: (Criteria extends T
					? Cases['widen']
					: never)) extends infer R
				? IsUnion<T, IsNever<R, R, R | Cases['union_miss']>, R>
				: never))
		: never,
		{ never: Cases['never'] }
	>

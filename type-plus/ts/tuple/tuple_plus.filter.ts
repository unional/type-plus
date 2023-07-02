/**
 * Filter entries matching `Criteria` in tuple `T`.
 *
 * ⚗️ *transform*
 *
 * @example
 * ```ts
 * type R = Filter<[1, 2, '3'], number> // [1, 2]
 * type R = Filter<[1, 2, '3'], true> // []
 * ```
 */
export type Filter<T extends unknown[], Criteria> = T['length'] extends 0
	? []
	: (
		T extends [infer Head, ...infer Tail]
		? (
			Tail['length'] extends 0
			? (
				Head extends Criteria
				? [Head]
				: [])
			: (
				Head extends Criteria
				? [Head, ...Filter<Tail, Criteria>]
				: Filter<Tail, Criteria>
			)
		)
		: never
	)

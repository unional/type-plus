import type { TupleType } from '../tuple/tuple_type.js'

/**
 * 🦴 *utilities*
 *
 * Gets the first type in the array or tuple that matches the `Criteria`.
 *
 * If the `Criteria` is not met, it will return `never'.
 *
 * For `Array<T>`, it will return `T | undefined` if `T` satisfies `Criteria`.
 *
 * @example
 * ```ts
 * ArrayPlus.Find<Array<1 | 2 | 'x'>, number> // 1 | 2 | undefined
 *
 * ArrayPlus.Find<[true, 1, 'x', 3], string> // 'x'
 * ```
 */
export type FindFirst<A extends unknown[], Criteria> = TupleType<
	A,
	A['length'] extends 0
		? never
		: A extends [infer Head, ...infer Tail]
		? Head extends Criteria
			? Head
			: FindFirst<Tail, Criteria>
		: never,
	A extends Array<infer T> ? (T extends Criteria ? T | undefined : never) : never
>

/**
 * @deprecated use FindFirst
 */
export type First<A extends any[], Criteria> = FindFirst<A, Criteria>

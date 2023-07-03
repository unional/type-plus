import type { TupleType } from '../tuple/tuple_type.js'
import type { Find as TupleFind } from '../tuple/tuple_plus.find.js'
import type { Find as ArrayFind } from './array_plus.find.js'

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
 * FindFirst<Array<1 | 2 | 'x'>, number> // 1 | 2 | undefined
 *
 * FindFirst<[true, 1, 'x', 3], string> // 'x'
 * ```
 */
export type FindFirst<A extends unknown[], Criteria, Cases extends {
	empty_tuple?: unknown,
	widen?: unknown
} = {
	empty_tuple: never,
	widen: Criteria | undefined
}> = TupleType<
	A,
	TupleFind<A, Criteria, Cases>,
	ArrayFind<A, Criteria, Cases>
>

/**
 * @deprecated use FindFirst
 */
export type First<A extends any[], Criteria> = FindFirst<A, Criteria>

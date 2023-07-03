import type { IsTuple } from '../tuple/tuple_type.js'
import type { IsUnion } from '../union/union.js'

/**
 * 🦴 *utilities*
 *
 * Gets the first type in the array that matches the `Criteria`.
 *
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
export type Find<A extends unknown[], Criteria, Cases extends {
	tuple?: unknown,
	widen?: unknown
} = {
	tuple: 'does not support tuple. Please use `FindFirst` or `TuplePlus.Find` instead.',
	widen: Criteria | undefined
}> =
	IsTuple<
		A,
		Cases['tuple'],
		A extends Array<infer T>
		? (T extends Criteria
			? T
			: Criteria extends T ? Cases['widen'] : never) extends infer R
		? IsUnion<T, R | undefined, R> : never
		: never
	>

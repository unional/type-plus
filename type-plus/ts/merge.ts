import type { IsAny } from './any/any_type.js'
import type { NonComposableTypes } from './composable_types.js'
import type { IsNever } from './never/never_type.js'
import type { AnyRecord } from './object/any_record.js'
import type { Merge as ObjectMerge } from './object/merge.js'
import type { Or } from './predicates/logical.js'
import type { IsUndefined } from './undefined/undefined_type.js'
import type { IsUnknown } from './unknown/unknown_type.js'
import type { IsVoid } from './void/void_type.js'

/**
 * Left join type `A` with type `B`.
 *
 * It handles cases like A or B are `Record`,
 * joining between required and optional props, etc.
 */
export type Merge<A, B> = Or<IsAny<A>, IsAny<B>, any,
	Or<Or<IsNever<A>, Or<IsUndefined<A>, IsVoid<A>>>, Or<IsNever<B>, Or<IsUndefined<B>, IsVoid<B>>>, never,
		IsUnknown<A, B, IsUnknown<B, A,
			[A, B] extends [NonComposableTypes, unknown] ? B
			: [A, B] extends [unknown, NonComposableTypes] ? A
			: (A extends AnyRecord
				? (B extends AnyRecord ? ObjectMerge<A, B> : never)
				: never)>>
	>>
/**
* Left join `a` with `b`.
*
* This returns the proper type of `{ ...a, ...b }`
*
* @example
* ```ts
* merge({ a: 1 }, {} as { a?: string | undefined }) // { a: number | string }
* ```
*/
export function merge<A, B>(a: A, b: B): Merge<A, B> {
	return { ...a, ...b } as any
}

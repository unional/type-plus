import type { Box } from './box.js'
import type { IsNever } from '../never/never_type.js'
import type { IsNull } from '../null/null_type.js'
import type { Merge as ObjectMerge } from '../object/merge.js'
import type { Or } from '../predicates/logical.js'
import type { IsUndefined } from '../undefined/undefined_type.js'
import type { IsUnknown } from '../unknown/unknown_type.js'
import type { IsVoid } from '../void/void_type.js'

/**
 * ⚗️ *transform*
 * 🔢 *customizable*
 *
 * Merges type `A` and type `B`.
 *
 * This type performs the same operations as `{ ...a, ...b }` but at the type level.
 *
 * This is a more general type then `ObjectPlus.Merge<A, B>`,
 * which constraints `A` and `B` to be `Record`.
 *
 * This type does not have such restrictions, and tries to handle the other types accordingly.
 */
export type Merge<A, B> =
	Or<
		IsNever<A>,
		IsNever<B>,
		never,
		Or<
			IsVoid<A>,
			IsVoid<B>,
			A & B,
			Or<
				IsUnknown<A>,
				Or<IsUndefined<A>, IsNull<A>>,
				B,
				Or<
					IsUnknown<B>,
					Or<IsUndefined<B>, IsNull<B>>,
					A,
					ObjectMerge<
						Box<A, { $notBoxable: {} }>,
						Box<B, { $notBoxable: {} }>
					>
				>
			>
		>
	>

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

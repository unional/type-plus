import type { NonComposableTypes } from './composable_types.js'
import type { AnyRecord } from './object/AnyRecord.js'
import type { IsDisjoint } from './object/IsDisjoint.js'
import type { KeyTypes } from './object/KeyTypes.js'
import type { OptionalKeys } from './object/OptionalKeys.js'
import type { Properties } from './object/properties.js'
import type { IsLiteral } from './predicates/literal.js'

/**
 * Left join type `A` with type `B`.
 *
 * It handles cases like A or B are `Record`,
 * joining between required and optional props, etc.
 */
export type Merge<A, B> = [A, B] extends [NonComposableTypes, unknown] ? B
	: [A, B] extends [unknown, NonComposableTypes] ? A
	: A extends AnyRecord ? B extends AnyRecord
	? IsDisjoint<A, B> extends true
	? A & B
	: ([keyof A, keyof B] extends [infer KA extends KeyTypes, infer KB extends KeyTypes]
		? (IsLiteral<KA> extends true
			? (IsLiteral<KB> extends true
				? ([OptionalKeys<A>, OptionalKeys<B>] extends [infer PKA extends KeyTypes, infer PKB extends KeyTypes]
					?
					// property is optional when both A[k] and B[k] are optional
					{
						[k in PKA & PKB]?: A[k] | B[k] | undefined
					} &
					{
						[k in Exclude<KA & KB, PKA | PKB>]: Merge.JoinProps<A[k], B[k]>
					} &
					// properties only in A excluding partials is A[k]
					{ [k in Exclude<KA, PKA | KB>]: A[k] } &
					// properties only in B excluding partials is B[k]
					{ [k in Exclude<KB, PKB>]: B[k] } &
					// properties is required in A but optional in B is unionized without undefined
					{ [k in Exclude<KA & PKB, PKA>]: Exclude<A[k] | Partial<B[k]>, undefined> }
					: never)
				: Properties<
					{ [k in Exclude<KA, KA & KB>]: A[k] } &
					{ [k in Exclude<KB, KA & KB>]: B[k] } &
					{ [k in KA & KB]: A[k] | B[k] }
				>)
			: (IsLiteral<KB> extends true
				? { [k in Exclude<KA, KB>]: A[k] } & { [k in keyof B]: B[k] }
				: { [k in Exclude<KA, KA & KB>]: A[k] } & { [k in Exclude<KB, KA & KB>]: B[k] } & {
					[k in KA & KB]: A[k] | B[k]
				}))
		: never)
	: never : never

export namespace Merge {
	export type JoinProps<A, B> = A extends NonComposableTypes
		? B
		: (B extends NonComposableTypes
			? A
			: A & B)
}

/**
* Left join `a` with `b`.
*
* This returns the proper type of `{ ...a, ...b }`
*
* @example
* ```ts
* leftJoin({ a: 1 }, {} as { a?: string | undefined }) // { a: number | string }
* ```
*/
export function merge<A, B>(a: A, b: B): Merge<A, B> {
	return { ...a, ...b } as any
}

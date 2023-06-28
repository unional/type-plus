import type { NonComposableTypes } from '../composable_types.js'
import type { IsLiteral } from '../predicates/index.js'
import type { AnyRecord } from './AnyRecord.js'
import type { IsDisjoint } from './IsDisjoint.js'
import type { KeyTypes } from './KeyTypes.js'
import type { Partial } from './Partial.js'
import type { PartialPropKeys } from './partial_prop.js'
import type { Properties } from './properties.js'


/**
 * Left join type `A` with type `B`.
 *
 * It handles cases like A or B are `Record`,
 * joining between required and optional props, etc.
 */
export type LeftJoin<A, B> = [A, B] extends [NonComposableTypes, unknown] | [unknown, NonComposableTypes] ? B
	: A extends AnyRecord ? B extends AnyRecord
	? IsDisjoint<A, B> extends true
	? A & B
	: ([keyof A, keyof B] extends [infer KA extends KeyTypes, infer KB extends KeyTypes]
		? (IsLiteral<KA> extends true
			? (IsLiteral<KB> extends true
				? ([PartialPropKeys<A>, PartialPropKeys<B>] extends [infer PKA extends KeyTypes, infer PKB extends KeyTypes]
					// property is optional when both A[k] and B[k] are optional
					? { [k in PKA & PKB]?: A[k] | B[k] | undefined } &
					{ [k in Exclude<KA & KB, PKA | PKB>]: LeftJoin<A[k], B[k]>
					} &
					// properties only in A excluding partials is A[k]
					{ [k in Exclude<KA, PKA | KB>]: A[k] } &
					// properties only in B excluding partials is B[k]
					{ [k in Exclude<KB, PKB>]: B[k] } &
					// properties is required in A but optional in B is unionized without undefined
					{ [k in Exclude<KA & PKB, PKA>]: Exclude<A[k] | Partial<B[k]>, undefined> }
					: never)
				: Properties<
					{ [k in Exclude<KA, KA & KB>]: A[k] } & { [k in Exclude<KB, KA & KB>]: B[k] } & {
						[k in KA & KB]: A[k] | B[k]
					}
				>)
			: (IsLiteral<KB> extends true
				? { [k in Exclude<KA, KB>]: A[k] } & { [k in keyof B]: B[k] }
				: { [k in Exclude<KA, KA & KB>]: A[k] } & { [k in Exclude<KB, KA & KB>]: B[k] } & {
					[k in KA & KB]: A[k] | B[k]
				}))
		: never)
	: never : never

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
export function leftJoin<A extends AnyRecord, B extends AnyRecord>(a: A, b: B): LeftJoin<A, B> {
	return { ...a, ...b } as any
}

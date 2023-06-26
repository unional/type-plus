import type { IsLiteral } from '../predicates/index.js'
import type { AnyRecord } from './AnyRecord.js'
import type { IsDisjoint } from './IsDisjoint.js'
import type { KeyTypes } from './KeyTypes.js'

/**
 * Left join type `A` with type `B`.
 *
 * It handles cases like A or B are `Record`,
 * joining between required and optional props, etc.
 */
export type LeftJoin<A extends AnyRecord, B extends AnyRecord> = IsDisjoint<A, B> extends true
	? A & B
	: [keyof A, keyof B] extends [infer KA extends KeyTypes, infer KB extends KeyTypes]
	? IsLiteral<KA> extends true
		? IsLiteral<KB> extends true
			? { [k in Exclude<KA, KB>]: A[k] } & {
					[k in KB]: undefined extends B[k] ? Exclude<A[k] | B[k], undefined> : B[k]
			  }
			: { [k in Exclude<KA, KA & KB>]: A[k] } & { [k in Exclude<KB, KA & KB>]: B[k] } & {
					[k in KA & KB]: A[k] | B[k]
			  }
		: IsLiteral<KB> extends true
		? { [k in Exclude<KA, KB>]: A[k] } & { [k in keyof B]: B[k] }
		: { [k in Exclude<KA, KA & KB>]: A[k] } & { [k in Exclude<KB, KA & KB>]: B[k] } & {
				[k in KA & KB]: A[k] | B[k]
		  }
	: never

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

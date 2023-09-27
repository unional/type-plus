import type { IsAny } from '../any/is_any.js'
import type { NonComposableTypes } from '../composable_types.js'
import type { IsNever } from '../never/is_never.js'
import type { IsNotNever } from '../never/is_not_never.js'
import type { $Never } from '../never/never.js'
import type { IsLiteral } from '../predicates/literal.js'
import type { Or } from '../predicates/logical.js'
import type { IsDisjoint } from './IsDisjoint.js'
import type { KeyTypes } from './KeyTypes.js'
import type { OptionalKeys } from './OptionalKeys.js'
import type { AnyRecord } from './any_record.js'

/**
 * ⚗️ *transform*
 * 🔢 *customizable*
 *
 * Merges type `A` and type `B`.
 *
 * This type performs the same operations as `{ ...a, ...b }` but at the type level.
 *
 * It handles cases like A or B are `Record`,
 * joining between required and optional props, etc.
 */
export type Merge<A extends AnyRecord, B extends AnyRecord, Options = Merge.DefaultOptions> = Or<
	IsAny<A>,
	IsAny<B>,
	any,
	Or<
		IsNever<A>,
		IsNever<B>,
		never,
		IsDisjoint<A, B> extends true
		? A & B
		: ([keyof A, keyof B] extends [infer KA extends KeyTypes, infer KB extends KeyTypes]
			? (IsLiteral<KA> extends true
				? (IsLiteral<KB> extends true
					? ([OptionalKeys<A>, OptionalKeys<B>] extends [infer PKA extends KeyTypes, infer PKB extends KeyTypes]
						?
						// property is optional when both A[k] and B[k] are optional
						(IsNotNever<
							PKA & PKB,
							{ selection: 'filter' }
						> extends infer R extends KeyTypes ? { [k in R]?: A[k] | B[k] } : unknown) &
						// properties only in A excluding partials is A[k]
						(IsNotNever<
							Exclude<KA, PKA | KB>,
							{ selection: 'filter' }
						> extends infer R extends KeyTypes ? { [k in R]: A[k] } : unknown) &
						// properties only in B excluding partials is B[k]
						(IsNotNever<
							Exclude<KB, PKB>,
							{ selection: 'filter' }
						> extends infer R extends KeyTypes ? { [k in R]: B[k] } : unknown) &
						// properties is required in A but optional in B is unionized without undefined
						(IsNotNever<
							Exclude<KA & PKB, PKA>,
							{ selection: 'filter' }
						> extends infer R extends KeyTypes ? { [k in R]: A[k] | Exclude<B[k], undefined> } : unknown)
						: never)
					:
					(IsNotNever<
						Exclude<KA, KA & KB>,
						{ selection: 'filter' }
					> extends infer R extends KeyTypes ? { [k in R]: A[k] } : unknown) &
					(IsNotNever<
						Exclude<KB, KA & KB>,
						{ selection: 'filter' }
					> extends infer R extends KeyTypes ? { [k in R]: B[k] } : unknown) &
					(IsNotNever<
						KA & KB,
						{ selection: 'filter' }
					> extends infer R extends KeyTypes ? { [k in R]: A[k] | B[k] } : unknown)
				)
				: (
					IsLiteral<KB> extends true
					? { [k in Exclude<KA, KB>]: A[k] } & { [k in keyof B]: B[k] }
					:
					(IsNotNever<
						Exclude<KA, KA & KB>,
						{ selection: 'filter' }
					> extends infer R extends KeyTypes ? { [k in R]: A[k] } : unknown) &
					(IsNotNever<
						Exclude<KB, KA & KB>,
						{ selection: 'filter' }
					> extends infer R extends KeyTypes ? { [k in R]: B[k] } : unknown) &
					(IsNotNever<
						KA & KB,
						{ selection: 'filter' }
					> extends infer R extends KeyTypes ? { [k in R]: A[k] | B[k] } : unknown)
				))
			: never)
	>
>

export namespace Merge {
	export type JoinProps<A, B> = A extends NonComposableTypes
		? B
		: (B extends NonComposableTypes
			? A
			: A & B)

	export type Options = {
		$never?: undefined
	}

	export interface DefaultOptions {
		$never: never
	}

	export type Cases = {
		$never: $Never
	}
}

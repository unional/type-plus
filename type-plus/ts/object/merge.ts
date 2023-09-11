import type { IsAny } from '../any/any_type.js'
import type { NonComposableTypes } from '../composable_types.js'
import type { IsNever, NotNeverType } from '../never/never_type.js'
import type { IsLiteral } from '../predicates/literal.js'
import type { Or } from '../predicates/logical.js'
import type { $Never } from '../type_plus/cases.js'
import type { AnyRecord } from './any_record.js'
import type { IsDisjoint } from './IsDisjoint.js'
import type { KeyTypes } from './KeyTypes.js'
import type { OptionalKeys } from './OptionalKeys.js'

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
						NotNeverType<
							PKA & PKB,
							{ [k in PKA & PKB]?: A[k] | B[k] },
							unknown
						> &
						// (NotNeverType<
						// 	Exclude<KA & KB, PKA | PKB>,
						// 	{ [k in Exclude<KA & KB, PKA | PKB>]: Merge.JoinProps<A[k], B[k]> },
						// 	unknown
						// >) &
						// properties only in A excluding partials is A[k]
						NotNeverType<
							Exclude<KA, PKA | KB>,
							{ [k in Exclude<KA, PKA | KB>]: A[k] },
							unknown
						> &
						// properties only in B excluding partials is B[k]
						NotNeverType<
							Exclude<KB, PKB>,
							{ [k in Exclude<KB, PKB>]: B[k] },
							unknown
						> &
						// properties is required in A but optional in B is unionized without undefined
						NotNeverType<
							Exclude<KA & PKB, PKA>,
							{ [k in Exclude<KA & PKB, PKA>]: A[k] | Exclude<B[k], undefined> },
							unknown
						>
						: never)
					:
					NotNeverType<
						Exclude<KA, KA & KB>,
						{ [k in Exclude<KA, KA & KB>]: A[k] },
						unknown
					> &
					NotNeverType<
						Exclude<KB, KA & KB>,
						{ [k in Exclude<KB, KA & KB>]: B[k] },
						unknown
					> &
					NotNeverType<
						KA & KB,
						{ [k in KA & KB]: A[k] | B[k] },
						unknown
					>
				)
				: (
					IsLiteral<KB> extends true
					? { [k in Exclude<KA, KB>]: A[k] } & { [k in keyof B]: B[k] }
					:
					NotNeverType<
						Exclude<KA, KA & KB>,
						{ [k in Exclude<KA, KA & KB>]: A[k] },
						unknown
					> &
					NotNeverType<
						Exclude<KB, KA & KB>,
						{ [k in Exclude<KB, KA & KB>]: B[k] },
						unknown
					> &
					NotNeverType<
						KA & KB,
						{ [k in KA & KB]: A[k] | B[k] },
						unknown
					>
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

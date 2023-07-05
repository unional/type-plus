import type { ElementMatch } from '../array/array_plus.element_match.js'
import type { NeverType } from '../never/never_type.js'
import type { MergeOptions } from '../utils/options.js'
import type { TupleType } from './tuple_type.js'

/**
 * 🦴 *utilities*
 * 🔢 *customizable*
 *
 * Find the first type in tuple `A` that matches `Criteria`.
 *
 * @example
 * ```ts
 * type R = TuplePlus.Find<[true, 1, 'x', 3], string> // 'x'
 * type R = TuplePlus.Find<[true, 1, 'x', 3], number> // 1
 * type R = TuplePlus.Find<[string, number, 1], 1> // widen: 1 | undefined
 * type R = TuplePlus.Find<[true, number | string], string> // unionMiss: string | undefined
 *
 * type R = TuplePlus.Find<[true, 1, 'x'], 2> // never
 * ```
 *
 * @typeParam Options['widen'] performs widen match.
 * Default to `true`.
 * With widen match, a narrowed type will match its widen type.
 * e.g. matching `1` against `number` yields `1 | undefined`
 *
 * The widen behavior can be customized by `Options['caseWiden']`
 *
 * @typeParam Options['caseArray'] return type when `A` is an array. Default to `not supported` message.
 *
 * @typeParam Options['caseEmptyTuple'] return type when `A` is an empty tuple.
 * Default to `never`.
 *
 * @typeParam Options['caseNever'] return type when `A` is `never`. Default to `never`.
 *
 * @typeParam Options['caseNoMatch'] Return value when `T` does not match `Criteria`.
 * Default to `never`.
 *
 * @typeParam Options['caseWiden'] return type when `T` in `A` is a widen type of `Criteria`.
 * Default to `Criteria | undefined`.
 * Set it to `never` for a more type-centric behavior
 *
 * @typeParam Options['caseUnionMiss'] Return value when a branch of the union `T` does not match `Criteria`.
 * Default to `undefined`.
 * Since it is a union, the result will be join to the matched branch as union.
 */
export type Find<
	A extends unknown[],
	Criteria,
	Options extends Find.Options = Find.DefaultOptions<Criteria>
> = MergeOptions<Options, Find.DefaultOptions<Criteria>> extends infer O extends Find.Options
	? TupleType<
		A,
		A['length'] extends 0
		? O['caseEmptyTuple']
		: Find.Device<A, Criteria, O>,
		O['caseArray'],
		O
	>
	: never
export namespace Find {
	export type Device<
		A extends unknown[],
		Criteria,
		Options extends Find.Options
	> = A['length'] extends 0
		? Options['caseNoMatch']
		: (A extends [infer Head, ...infer Tail]
			? ElementMatch<
				Head,
				Criteria,
				MergeOptions<{ caseNoMatch: Device<Tail, Criteria, Options> }, Options>
			>
			: never)
	export interface Options extends ElementMatch.Options, NeverType.Options {
		caseArray?: unknown,
		caseEmptyTuple?: unknown,
	}

	export interface DefaultOptions<Criteria> extends ElementMatch.DefaultOptions<Criteria>, NeverType.DefaultOptions {
		caseArray: 'does not support array. Please use `FindFirst` or `ArrayPlus.Find` instead.',
		caseEmptyTuple: never,
	}
}

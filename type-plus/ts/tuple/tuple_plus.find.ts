import type { ElementMatch } from '../array/array_plus.element_match.js'
import type { $NeverDefault, $NeverOptions } from '../never/never.js'
import type { TypePlusOptions } from '../utils/options.js'
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
 * The widen behavior can be customized by `Options['$widen']`
 *
 * @typeParam Options['$array'] return type when `A` is an array. Default to `not supported` message.
 *
 * @typeParam Options['caseEmptyTuple'] return type when `A` is an empty tuple.
 * Default to `never`.
 *
 * @typeParam Options['$never'] return type when `A` is `never`. Default to `never`.
 *
 * @typeParam Options['$notMatch'] Return value when `T` does not match `Criteria`.
 * Default to `never`.
 *
 * @typeParam Options['$widen'] return type when `T` in `A` is a widen type of `Criteria`.
 * Default to `Criteria | undefined`.
 * Set it to `never` for a more type-centric behavior
 *
 * @typeParam Options['$unionNotMatch'] Return value when a branch of the union `T` does not match `Criteria`.
 * Default to `never`.
 *
 * If you want the type to behave more like JavaScript,
 * you can override it to return `undefined`.
 *
 * Since it is a union, the result will be joined to the matched branch as union.
 */
export type Find<
	A extends readonly unknown[],
	Criteria,
	Options extends Find.Options = Find.DefaultOptions<Criteria>
> = TypePlusOptions.Merge<Options, Find.DefaultOptions<Criteria>> extends infer O extends Find.Options
	? TupleType<
		A,
		A['length'] extends 0
		? O['$emptyTuple']
		: Find.Device<A, Criteria, O>,
		O['$array'],
		O
	>
	: never
export namespace Find {
	export type Device<
		A extends readonly unknown[],
		Criteria,
		Options extends Find.Options
	> = A['length'] extends 0
		? Options['$notMatch']
		: (A extends readonly [infer Head, ...infer Tail]
			? ElementMatch<
				Head,
				Criteria,
				TypePlusOptions.Merge<{ $notMatch: Device<Tail, Criteria, Options> }, Options>
			>
			: never)
	export interface Options extends ElementMatch.Options, $NeverOptions {
		$array?: unknown,
		$emptyTuple?: unknown,
	}

	export interface DefaultOptions<Criteria> extends ElementMatch.DefaultOptions<Criteria>, $NeverDefault {
		$array: 'does not support array. Please use `FindFirst` or `ArrayPlus.Find` instead.',
		$emptyTuple: never,
	}
}

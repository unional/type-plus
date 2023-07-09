import type { NeverType } from '../never/never_type.js'
import type { TupleType } from '../tuple/tuple_type.js'
import type { TypePlusOptions } from '../utils/options.js'
import type { ElementMatch } from './array_plus.element_match.js'

/**
 * 🦴 *utilities*
 * 🔢 *customizable*
 *
 * Finds the type in array `A` that matches `Criteria`.
 *
 * @example
 * ```ts
 * type R = ArrayPlus.Find<Array<string>, string> // string
 * type R = ArrayPlus.Find<Array<1 | 2 | 'x'>, number> // 1 | 2 | undefined
 * type R = ArrayPlus.Find<Array<string | number>, number | string> // string | number
 * type R = ArrayPlus.Find<Array<number>, 1> // widen: 1 | undefined
 * type R = ArrayPlus.Find<Array<string | number>, number> // unionMiss: number | undefined
 *
 * type R = ArrayPlus.Find<string[], number> // never
 * ```
 *
 * @typeParam Options['widen'] performs widen match.
 * Default to `true`.
 * With widen match, a narrowed type will match its widen type.
 * e.g. matching `1` against `number` yields `1 | undefined`
 *
 * The widen behavior can be customized by `Options['caseWiden']`
 *
 * @typeParam Options['caseNever'] return type when `A` is `never`. Default to `never`.
 *
 * @typeParam Options['caseNotMatch'] Return value when `T` does not match `Criteria`.
 * Default to `never`.
 *
 * @typeParam Options['caseTuple'] return type when `A` is a tuple. Default to `not supported` message.
 *
 * @typeParam Options['caseWiden'] return type when `T` in `A` is a widen type of `Criteria`.
 * Default to `Criteria | undefined`.
 * Set it to `never` for a more type-centric behavior
 *
 * @typeParam Options['caseUnionNotMatch'] Return value when a branch of the union `T` does not match `Criteria`.
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
> =
	TypePlusOptions.Merge<Options, Find.DefaultOptions<Criteria>> extends infer O extends Find.Options
	? TupleType<
		A,
		O['caseTuple'],
		A extends Readonly<Array<infer T>> ? ElementMatch<T, Criteria, O> : never,
		O
	>
	: never

export namespace Find {
	export interface Options extends ElementMatch.Options, NeverType.Options {
		caseTuple?: unknown,
	}

	export interface DefaultOptions<Criteria> extends ElementMatch.DefaultOptions<Criteria>, NeverType.DefaultOptions {
		caseTuple: 'does not support tuple. Please use `FindFirst` or `TuplePlus.Find` instead.',
	}
}

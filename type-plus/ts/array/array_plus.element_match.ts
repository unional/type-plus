import type { IsNever } from '../never/never_type.js'
import type { IsUnion } from '../union/union.js'
import type { TypePlusOptions } from '../utils/options.js'

/**
 * 🦴 *utilities*
 * 🔢 *customizable*
 *
 * Filter the element `T` in an array or tuple to match `Criteria`.
 *
 * @typeParam Options['widen'] Allow using narrow type to match widen type.
 * e.g. `number, 1` -> `1 | undefined`.
 * Default to `true`.
 *
 * @typeParam Options['caseNotMatch'] Return value when `T` does not match `Criteria`.
 * Default to `never`.
 *
 * @typeParam Options['caseWiden'] Return value when `widen` is true.
 * Default to `Criteria | undefined`.
 *
 * @typeParam Options['caseUnionNotMatch'] Return value when a branch of the union `T` does not match `Criteria`.
 * Default to `never`.
 *
 * If you want the type to behave more like JavaScript,
 * you can override it to return `undefined`.
 *
 * Since it is a union, the result will be joined to the matched branch as union.
 * e.g. `ElementMatch<1 | 2, 1>` -> `1 | undefined`
 */
export type ElementMatch<
	T,
	Criteria,
	Options extends ElementMatch.Options = ElementMatch.DefaultOptions<Criteria>
> = [T] extends [Criteria]
	? T
	: (TypePlusOptions.Merge<Options, ElementMatch.DefaultOptions<Criteria>> extends infer C extends Record<keyof ElementMatch.Options, unknown>
		? ((T extends Criteria
			? T
			: (C['widen'] extends true
				? (Criteria extends T
					? C['caseWiden']
					: C['caseNotMatch'])
				: C['caseNotMatch'])) extends infer R
			? IsUnion<T, IsNever<R, R, R | C['caseUnionNotMatch']>, R>
			: C['caseNotMatch'])
		: never)

export namespace ElementMatch {
	export interface Options {
		widen?: boolean | undefined,
		caseNotMatch?: unknown,
		caseWiden?: unknown,
		caseUnionNotMatch?: unknown
	}
	export interface DefaultOptions<Criteria> {
		widen: true,
		caseNotMatch: never,
		caseWiden: Criteria | undefined,
		caseUnionNotMatch: never
	}
}

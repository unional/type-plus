import type { IsNever } from '../never/never_type.js'
import type { IsUnion } from '../union/union.js'
import type { MergeOptions } from '../utils/options.js'

/**
 * 🦴 *utilities*
 * ㊙️ *internal*
 * 🔢 *customizable*
 *
 * Match element in an array or tuple.
 *
 * @typeParam Options['widen'] Allow using narrow type to match widen type.
 * e.g. `number, 1` -> `1 | undefined`.
 * Default to `true`.
 *
 * @typeParam Options['caseNoMatch'] Return value when `T` does not match `Criteria`.
 * Default to `never`.
 *
 * @typeParam Options['caseWiden'] Return value when `widen` is true.
 * Default to `Criteria | undefined`.
 *
 * @typeParam Options['caseUnionMiss'] Return value when a branch of the union `T` does not match `Criteria`.
 * Default to `undefined`.
 * Since it is a union, the result will be join to the matched branch as union.
 * e.g. `ElementMatch<1 | 2, 1>` -> `1 | undefined`
 */
export type ElementMatch<
	T,
	Criteria,
	Options extends ElementMatch.Options = ElementMatch.DefaultOptions<Criteria>
> = [T] extends [Criteria]
	? T
	: (MergeOptions<Options, ElementMatch.DefaultOptions<Criteria>> extends infer C extends Record<keyof ElementMatch.Options, unknown>
		? ((T extends Criteria
			? T
			: (C['widen'] extends true
				? (Criteria extends T
					? C['caseWiden']
					: C['caseNoMatch'])
				: C['caseNoMatch'])) extends infer R
			? IsUnion<T, IsNever<R, R, R | C['caseUnionMiss']>, R>
			: C['caseNoMatch'])
		: never)

export namespace ElementMatch {
	export interface Options {
		widen?: boolean | undefined,
		caseNoMatch?: unknown,
		caseWiden?: unknown,
		caseUnionMiss?: unknown
	}
	export interface DefaultOptions<Criteria> {
		widen: true,
		caseNoMatch: never,
		caseWiden: Criteria | undefined,
		caseUnionMiss: undefined
	}
}

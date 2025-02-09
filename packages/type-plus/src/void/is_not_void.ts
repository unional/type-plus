import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { NotAssignable } from '../predicates/not_assignable.js'
import type { IsUndefined } from '../undefined/is_undefined.js'

/**
 * 🎭 **predicate**
 *
 * Validate if `T` is not `void`.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void> // false
 *
 * type R = IsNotVoid<never> // true
 * type R = IsNotVoid<unknown> // true
 * type R = IsNotVoid<string | boolean> // true
 * type R = IsNotVoid<string | void> // boolean
 * ```
 *
 * 🌪️ **filter**
 *
 * Filter to ensure `T` is not `void`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void, { selection: 'filter' }> // never
 *
 * type R = IsNotVoid<never, { selection: 'filter' }> // never
 * type R = IsNotVoid<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotVoid<string | void, { selection: 'filter' }> // string
 * ```
 *
 * 🔀 **distributive**
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void | string> // boolean
 * type R = IsNotVoid<void | string, { distributive: false }> // true
 * ```
 *
 * 🔱 **branching**
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void, $Selection.Branch> // $Else
 * type R = IsNotVoid<string, $Selection.Branch> // $Then
 * ```
 */
export type IsNotVoid<T, $O extends IsNotVoid.Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$any: $ResolveBranch<$O, [$Any, $Then], T>
			$unknown: $ResolveBranch<$O, [$Unknown, $Then], T>
			$never: $ResolveBranch<$O, [$Never, $Then], T>
			$void: $ResolveBranch<$O, [$Else]>
			$else: IsNotVoid.$<T, $O>
		}
	>
>

export namespace IsNotVoid {
	export type Options = $Options & $InputOptions<$Any | $Unknown | $Never>
	export type Branch<$O extends Options = {}> = $Branch<$O> & $Any.$Branch & $Unknown.$Branch & $Never.$Branch

	/**
	 * Validate if `T` is not `void`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $Options> = IsUndefined.$<
		T,
		{
			$then: $ResolveBranch<$O, [$Then], T>
			$else: NotAssignable.$<Exclude<T, undefined>, void, $O>
		}
	>

	export type $Options = NotAssignable.$UtilOptions
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}

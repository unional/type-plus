import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { Assignable } from '../predicates/assignable.js'
import type { IsUndefined } from '../undefined/is_undefined.js'

/**
 * 🎭 **predicate**
 *
 * Validate if `T` is `void`.
 *
 * @example
 * ```ts
 * type R = IsVoid<void> // true
 *
 * type R = IsVoid<never> // false
 * type R = IsVoid<unknown> // false
 * type R = IsVoid<string | boolean> // false
 * type R = IsVoid<string | void> // boolean
 * ```
 *
 * 🌪️ **filter**
 *
 * Filter to ensure `T` is `void`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsVoid<void, { selection: 'filter' }> // void
 *
 * type R = IsVoid<never, { selection: 'filter' }> // never
 * type R = IsVoid<unknown, { selection: 'filter' }> // never
 * type R = IsVoid<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsVoid<string | void> // void
 * ```
 *
 * 🔀 **distributive**
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsVoid<void | 1> // boolean
 * type R = IsVoid<void | 1, { distributive: false }> // false
 * ```
 *
 * 🔱 **branching**
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsVoid<void, $Selection.Branch> // $Then
 * type R = IsVoid<string, $Selection.Branch> // $Else
 * ```
 */
export type IsVoid<T, $O extends IsVoid.Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$any: $ResolveBranch<$O, [$Any, $Else]>
			$unknown: $ResolveBranch<$O, [$Unknown, $Else]>
			$never: $ResolveBranch<$O, [$Never, $Else]>
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsVoid.$<T, $O>
		}
	>
>

export namespace IsVoid {
	export type Options = $Options & $InputOptions<$Any | $Unknown | $Never>
	export type Branch<$O extends Options = {}> = $Branch<$O> & $Any.$Branch & $Unknown.$Branch & $Never.$Branch

	/**
	 * Validate if `T` is `void`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $Options = {}> = IsUndefined.$<
		T,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: Assignable.$<Exclude<T, undefined>, void, $O>
		}
	>

	export type $Options = Assignable.$UtilOptions
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}

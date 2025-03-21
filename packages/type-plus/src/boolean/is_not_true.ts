import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { NotAssignable } from '../predicates/not_assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `true`.
 *
 * @example
 * ```ts
 * type R = IsNotTrue<boolean> // boolean
 * type R = IsNotTrue<true> // false
 * type R = IsNotTrue<false> // true
 *
 * type R = IsNotTrue<number> // true
 * type R = IsNotTrue<unknown> // true
 * type R = IsNotTrue<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `true`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotTrue<boolean, { selection: 'filter' }> // false
 * type R = IsNotTrue<true, { selection: 'filter' }> // never
 * type R = IsNotTrue<false, { selection: 'filter' }> // false
 *
 * type R = IsNotTrue<number, { selection: 'filter' }> // number
 * type R = IsNotTrue<never, { selection: 'filter' }> // never
 * type R = IsNotTrue<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotTrue<string | boolean, { selection: 'filter' }> // string | false
 * type R = IsNotTrue<string | true, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotTrue<boolean | 1> // boolean
 * type R = IsNotTrue<true | 1> // boolean
 * type R = IsNotTrue<false | 1> // true
 * type R = IsNotTrue<boolean | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotTrue<true, $SelectionBranch> // $Else
 * type R = IsNotTrue<boolean, $SelectionBranch> // $Then | $Else
 * type R = IsNotTrue<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotTrue<T, $O extends IsNotTrue.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotTrue.$<T, $O>
		}
	>
>
export namespace IsNotTrue {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not `true`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = NotAssignable.$<T, true, $O>

	export type $UtilOptions = NotAssignable.$UtilOptions
}

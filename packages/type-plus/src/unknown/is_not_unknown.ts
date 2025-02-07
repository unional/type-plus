import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Void } from '../$type/special/$void.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsNotUnknown<unknown> // false
 *
 * type R = IsNotUnknown<number> // true
 * type R = IsNotUnknown<never> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsNotUnknown<unknown, { selection: 'filter' }> // never
 *
 * type R = IsNotUnknown<number, { selection: 'filter' }> // number
 * type R = IsNotUnknown<never, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotUnknown<unknown, $SelectionBranch> // $Else
 * type R = IsNotUnknown<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotUnknown<T, $O extends IsNotUnknown.$Options = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<$O, [$Any, $Then], T>
		$unknown: $ResolveBranch<$O, [$Else]>
		$never: $ResolveBranch<$O, [$Never, $Then], T>
		$void: $ResolveBranch<$O, [$Void, $Then], T>
		$else: $ResolveBranch<$O, [$Then], T>
	}
>

export namespace IsNotUnknown {
	export type $Options = $Selection.Options & $InputOptions<$Any | $Never>
	export type $Branch = $Selection.Branch
}

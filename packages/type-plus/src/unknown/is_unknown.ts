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
 * Validate if `T` is exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsUnknown<unknown> // true
 *
 * type R = IsUnknown<number> // false
 * type R = IsUnknown<never> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsUnknown<unknown, { selection: 'filter' }> // unknown
 *
 * type R = IsUnknown<number, { selection: 'filter' }> // never
 * type R = IsUnknown<never, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsUnknown<unknown, $SelectionBranch> // $Then
 * type R = IsUnknown<string, $SelectionBranch> // $Else
 * ```
 */
export type IsUnknown<T, $O extends IsUnknown.$Options = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<$O, [$Any, $Else]>
		$never: $ResolveBranch<$O, [$Never, $Else]>
		$unknown: $ResolveBranch<$O, [$Then], T>
		$void: $ResolveBranch<$O, [$Void, $Else]>
		$else: $ResolveBranch<$O, [$Else]>
	}
>

export namespace IsUnknown {
	export type $Options = $Selection.Options & $InputOptions<$Any | $Never>
	export type $Branch = $Selection.Branch
}

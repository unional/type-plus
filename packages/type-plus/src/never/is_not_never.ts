import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` not `never`.
 *
 * @example
 * ```ts
 * type R = IsNotNever<1> // true
 *
 * type R = IsNotNever<never> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `never`, otherwise returns `$Never`.
 *
 * Filter normally returns `never` in the `$else` clause.
 * But since we are checking for `never` here,
 * we have to return `$Never` instead.
 *
 * @example
 * ```ts
 * type R = IsNotNever<1, { selection: 'filter' }> // 1
 *
 * type R = IsNotNever<never, { selection: 'filter' }> // $Never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotNever<never, $SelectionBranch> // $Else
 * type R = IsNotNever<1, $SelectionBranch> // $Then
 * ```
 */
export type IsNotNever<T, $O extends IsNotNever.$Options = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<T, $O, [$Any, $Then]>
		$never: $ResolveBranch<T, IsNotNever._O<$O>, [$Else]>
		$unknown: $ResolveBranch<T, $O, [$Unknown, $Then]>
		$void: $ResolveBranch<T, $O, [$Void, $Then]>
		$else: $ResolveBranch<T, $O, [$Then]>
	}
>

export namespace IsNotNever {
	export type $Options = $Selection.Options & $InputOptions<$Any | $Unknown>
	export type $Branch = $Selection.Branch
	export type _O<$O extends $Options> = '$else' extends keyof $O
		? $O
		: $O['selection'] extends 'filter'
			? $O & { $else: $Never }
			: $O
}

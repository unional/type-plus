import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `any`.
 *
 * @example
 * ```ts
 * type R = IsNotAny<any> // false
 *
 * type R = IsNotAny<never> // true
 * type R = IsNotAny<unknown> // true
 * type R = IsNotAny<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `any`.
 *
 * @example
 * ```ts
 * type R = IsNotAny<any, { selection: 'filter' }> // never
 *
 * type R = IsNotAny<never, { selection: 'filter' }> // never
 * type R = IsNotAny<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotAny<string | boolean, { selection: 'filter' }> // string | boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotAny<any, $SelectionBranch> // $Else
 * type R = IsNotAny<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotAny<T, $O extends IsNotAny.$Options = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<$O, [$Else]>
		$never: $ResolveBranch<$O, [$Never, $Then], T>
		$unknown: $ResolveBranch<$O, [$Unknown, $Then], T>
		$void: $ResolveBranch<$O, [$Void, $Then], T>
		$else: $ResolveBranch<$O, [$Then], T>
	}
>

export namespace IsNotAny {
	export type $Options = $Selection.Options & $InputOptions<$Unknown | $Never>
	export type $Branch = $Selection.Branch
}

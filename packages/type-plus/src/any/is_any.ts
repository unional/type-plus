import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'

/**
 * 🎭 **predicate**
 *
 * Validate if `T` is `any`.
 *
 * @example
 * ```ts
 * type R = IsAny<any> // true
 *
 * type R = IsAny<never> // false
 * type R = IsAny<unknown> // false
 * type R = IsAny<string | boolean> // false
 * ```
 *
 * 🌪️ **filter**
 *
 * Filter to ensure `T` is `any`.
 *
 * @example
 * ```ts
 * type R = IsAny<any, { selection: 'filter' }> // any
 * type R = IsAny<never, { selection: 'filter' }> // never
 * type R = IsAny<unknown, { selection: 'filter' }> // never
 * type R = IsAny<string | boolean, { selection: 'filter' }> // never
 * ```
 *
 * 🔱 **branching**
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsAny<any, $Selection.Branch> // $Then
 * type R = IsAny<string, $Selection.Branch> // $Else
 * type R = IsAny<unknown, IsAny.$Branch> // $Unknown
 * type R = IsAny<never, IsAny.$Branch> // $Never
 * type R = IsAny<void, IsAny.$Branch> // $Void
 * ```
 *
 * @since 🏷️ 8.0.0
 */
export type IsAny<T, $O extends IsAny.$Options = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<$O, [$Then], T>
		$unknown: $ResolveBranch<$O, [$Unknown, $Else]>
		$never: $ResolveBranch<$O, [$Never, $Else]>
		$void: $ResolveBranch<$O, [$Void, $Else]>
		$else: $ResolveBranch<$O, [$Else]>
	}
>

export namespace IsAny {
	export type $Options = $Selection.Options & $InputOptions<$Unknown | $Never | $Void>
	export type $Branch = $Selection.Branch & $Unknown.$Branch & $Never.$Branch & $Void.$Branch
}

import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else } from '../$type/branch/$selection.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 **predicate**
 *
 * Validate if `T` is `null`.
 *
 * @example
 * ```ts
 * type R = IsNull<null> // true
 *
 * type R = IsNull<never> // false
 * type R = IsNull<unknown> // false
 * type R = IsNull<string | boolean> // false
 *
 * type R = IsNull<string | null> // boolean
 * ```
 *
 * 🌪️ **filter**
 *
 * Filter to ensure `T` is `null`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNull<null, { selection: 'filter' }> // null
 *
 * type R = IsNull<never, { selection: 'filter' }> // never
 * type R = IsNull<unknown, { selection: 'filter' }> // never
 * type R = IsNull<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsNull<string | null> // null
 * ```
 *
 * 🔀 **distributive**
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNull<null | 1> // boolean
 * type R = IsNull<null | 1, { distributive: false }> // false
 * ```
 *
 * 🔱 **branching**
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNull<null, $Selection.Branch> // $Then
 * type R = IsNull<string, $Selection.Branch> // $Else
 *
 * type R = IsNull<any, IsNull.Branch> // $Any
 * type R = IsNull<unknown, IsNull.Branch> // $Unknown
 * type R = IsNull<never, IsNull.Branch> // $Never
 * type R = IsNull<void, IsNull.Branch> // $Void
 * ```
 *
 * @since 🏷️ 8.0.0
 */
export type IsNull<T, $O extends IsNull.Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$any: $ResolveBranch<$O, [$Any, $Else]>
			$unknown: $ResolveBranch<$O, [$Unknown, $Else]>
			$never: $ResolveBranch<$O, [$Never, $Else]>
			$void: $ResolveBranch<$O, [$Void, $Else]>
			$else: IsNull.$<T, $O>
		}
	>
>

export namespace IsNull {
	export type Options = $Options & $InputOptions<$Any | $Unknown | $Never | $Void>
	export type Branch<$O extends Options = {}> = $Branch<$O> &
		$Any.$Branch &
		$Unknown.$Branch &
		$Never.$Branch &
		$Void.$Branch

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `null`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $Options> = Assignable.$<T, null, $O>

	export type $Options = Assignable.$UtilOptions
	export type $Branch<$O extends $Options = {}> = Assignable.$Branch<$O>
}

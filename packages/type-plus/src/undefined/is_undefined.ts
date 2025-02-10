import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection } from '../$type/branch/$selection.js'
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
 * Validate if `T` is `undefined`.
 *
 * @example
 * ```ts
 * type R = IsUndefined<undefined> // true
 *
 * type R = IsUndefined<never> // false
 * type R = IsUndefined<unknown> // false
 * type R = IsUndefined<string | boolean> // false
 * type R = IsUndefined<string | undefined> // boolean
 * ```
 *
 * 🌪️ **filter**
 *
 * Filter to ensure `T` is `undefined`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsUndefined<undefined, { selection: 'filter' }> // undefined
 *
 * type R = IsUndefined<never, { selection: 'filter' }> // never
 * type R = IsUndefined<unknown, { selection: 'filter' }> // never
 * type R = IsUndefined<string | boolean, { selection: 'filter' }> // never
 * type R = IsUndefined<string | undefined, { selection: 'filter' }> // undefined
 * ```
 *
 * 🔀 **distributive**
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsUndefined<undefined | 1> // boolean
 * type R = IsUndefined<undefined | 1, { distributive: false }> // false
 * ```
 *
 * 🔱 **branching**
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsUndefined<undefined, $Selection.Branch> // $Then
 * type R = IsUndefined<string, $Selection.Branch> // $Else
 *
 * type R = IsUndefined<any, IsUndefined.Branch> // $Any
 * type R = IsUndefined<unknown, IsUndefined.Branch> // $Unknown
 * type R = IsUndefined<never, IsUndefined.Branch> // $Never
 * type R = IsUndefined<void, IsUndefined.Branch> // $Void
 * ```
 *
 * @since 🏷️ 8.0.0
 */
export type IsUndefined<T, $O extends IsUndefined.Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$any: $ResolveBranch<$O, [$Any, $Else]>
			$unknown: $ResolveBranch<$O, [$Unknown, $Else]>
			$never: $ResolveBranch<$O, [$Never, $Else]>
			$void: $ResolveBranch<$O, [$Void, $Else]>
			$then: $ResolveBranch<$O, [$Else]>
			$else: IsUndefined.$<T, $O>
		}
	>
>

export namespace IsUndefined {
	export type Options = $Options & $InputOptions<$Any | $Unknown | $Never | $Void>
	export type Branch<$O extends Options = {}> = $Branch<$O> &
		$Any.$Branch &
		$Unknown.$Branch &
		$Never.$Branch &
		$Void.$Branch

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `undefined`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $Options> = Assignable.$<T, undefined, $O>
	export type $Options = Assignable.$UtilOptions
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}

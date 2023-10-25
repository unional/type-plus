import type { NotAssignable } from '../predicates/not_assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Then } from '../type_plus/branch/$selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `null`.
 *
 * ```ts
 * type R = IsNotNull<null> // false
 *
 * type R = IsNotNull<never> // true
 * type R = IsNotNull<unknown> // true
 * type R = IsNotNull<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `null`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotNull<null, { selection: 'filter' }> // never
 *
 * type R = IsNotNull<never, { selection: 'filter' }> // never
 * type R = IsNotNull<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotNull<string | boolean, { selection: 'filter' }> // string | boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotNull<null | 1> // boolean
 * type R = IsNotNull<null | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotNull<string, $SelectionBranch> // $Then
 * type R = IsNotNull<null, $SelectionBranch> // $Else
 * ```
 */
export type IsNotNull<T, $O extends IsNotNull.$Options = {}> = $SpecialType<T,
	$MergeOptions<$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>,
			$else: IsNotNull.$<T, $O>
		}
	>
>


export namespace IsNotNull {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `null`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = NotAssignable.$<T, null, $O>

	export type $UtilOptions = NotAssignable.$UtilOptions
}

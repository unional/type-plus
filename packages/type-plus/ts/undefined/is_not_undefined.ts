import type { NotAssignable } from '../predicates/not_assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Then } from '../type_plus/branch/$selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `undefined`.
 *
 * @example
 * ```ts
 * type R = IsNotUndefined<undefined> // false
 *
 * type R = IsNotUndefined<never> // true
 * type R = IsNotUndefined<unknown> // true
 * type R = IsNotUndefined<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `undefined`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotUndefined<undefined, { selection: 'filter' }> // never
 *
 * type R = IsNotUndefined<never, { selection: 'filter' }> // never
 * type R = IsNotUndefined<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotUndefined<string | boolean, { selection: 'filter' }> // string | boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotUndefined<undefined | 1> // boolean
 * type R = IsNotUndefined<undefined | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotUndefined<string, $SelectionBranch> // $Then
 * type R = IsNotUndefined<undefined, $SelectionBranch> // $Else
 * ```
 */
export type IsNotUndefined<T, $O extends IsNotUndefined.$Options = {}> =
	$SpecialType<T,
		$MergeOptions<$O,
			{
				$then: $ResolveBranch<T, $O, [$Then]>,
				$else: IsNotUndefined.$<T, $O>
			}
		>
	>


export namespace IsNotUndefined {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `undefined`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = NotAssignable.$<T, undefined, $O>
	export type $UtilOptions = NotAssignable.$UtilOptions
}

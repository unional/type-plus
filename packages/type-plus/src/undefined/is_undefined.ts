import type { Assignable } from '../predicates/assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else } from '../type_plus/branch/$selection.js'

/**
 * 🎭 *predicate*
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
 *
 * type R = IsUndefined<string | undefined> // boolean
 * ```
 *
 * 🔢 *customize*
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
 *
 * type R = IsUndefined<string | undefined> // undefined
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsUndefined<undefined | 1> // boolean
 * type R = IsUndefined<undefined | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsUndefined<undefined, $SelectionBranch> // $Then
 * type R = IsUndefined<string, $SelectionBranch> // $Else
 * ```
 */
export type IsUndefined<T, $O extends IsUndefined.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>
			$else: IsUndefined.$<T, $O>
		}
	>
>

export namespace IsUndefined {
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
	export type $<T, $O extends $UtilOptions> = Assignable.$<T, undefined, $O>
	export type $UtilOptions = Assignable.$UtilOptions
}

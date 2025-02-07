import type { $Equality } from '../$type/$equality.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Then } from '../$type/branch/$selection.js'
import type { $SpecialType } from '../$type/special/$special_type.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { NotAssignable } from '../predicates/not_assignable.js'
import type { IsUndefined } from '../undefined/is_undefined.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `void`.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void> // false
 *
 * type R = IsNotVoid<never> // true
 * type R = IsNotVoid<unknown> // true
 * type R = IsNotVoid<string | boolean> // true
 *
 * type R = IsNotVoid<string | void> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `void`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void, { selection: 'filter' }> // never
 *
 * type R = IsNotVoid<never, { selection: 'filter' }> // never
 * type R = IsNotVoid<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotVoid<string | void, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void | string> // boolean
 * type R = IsNotVoid<void | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotVoid<void, $SelectionBranch> // $Else
 * type R = IsNotVoid<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotVoid<T, $O extends IsNotVoid.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>
			$else: IsNotVoid.$<T, $O>
		}
	>
>

export namespace IsNotVoid {
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
	export type $<T, $O extends $UtilOptions> = IsUndefined.$<
		T,
		{
			$then: $ResolveBranch<T, $O, [$Then]>
			$else: NotAssignable.$<T, void, $O>
		}
	>

	export type $UtilOptions = NotAssignable.$UtilOptions
}

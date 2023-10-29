import type { NotAssignable } from '../predicates/not_assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $Exact } from '../type_plus/branch/$exact.js'
import type { $IsDistributive } from '../type_plus/branch/$is_distributive.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `string` nor `string` literals.
 *
 * @example
 * ```ts
 * type R = IsNotString<string> // false
 * type R = IsNotString<'a'> // false
 *
 * type R = IsNotString<never> // false
 * type R = IsNotString<unknown> // false
 * type R = IsNotString<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `string` nor `string` literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotString<string, { selection: 'filter' }> // never
 * type R = IsNotString<'a', { selection: 'filter' }> // never
 *
 * type R = IsNotString<never, { selection: 'filter' }> // never
 * type R = IsNotString<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotString<string | boolean, { selection: 'filter' }> // boolean
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotString<string | 1> // boolean
 * type R = IsNotString<string | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotString<string, $IsNotString.$Branch> // $Else
 * type R = IsNotString<bigint, $IsNotString.$Branch> // $Then
 * ```
 */
export type IsNotString<T, $O extends IsNotString.$Options = {}> = $SpecialType<T,
	$MergeOptions<$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>,
			$else: IsNotString.$<T, $O>
		}
	>
>

export namespace IsNotString {
	export type $Options = $Equality.$Options & $Exact.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not `string` nor `string` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> =
		$ResolveOptions<[$O['exact'], false]> extends true
		? $IsDistributive<$O, { $then: _D<T, $O>, $else: _N<T, $O> }>
		: NotAssignable.$<T, string, $O>
	export type $UtilOptions = NotAssignable.$UtilOptions & $Exact.$Options

	export type _D<T, $O extends $SelectionOptions> =
		T extends string & infer U
		? (
			U extends string
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		)
		: $ResolveBranch<T, $O, [$Then]>
	export type _N<T, $O extends $SelectionOptions> =
		[string, T] extends [T, string]
		? $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
}

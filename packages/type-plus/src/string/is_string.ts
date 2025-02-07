import type { $Equality } from '../$type/$equality.js'
import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $SpecialType } from '../$type/$special_type.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `string` or `string` literals.
 *
 * @example
 * ```ts
 * type R = IsString<string> // true
 * type R = IsString<'a'> // true
 *
 * type R = IsString<never> // false
 * type R = IsString<unknown> // false
 * type R = IsString<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `string` or `string` literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsString<string, { selection: 'filter' }> // string
 * type R = IsString<'a', { selection: 'filter' }> // 'a'
 *
 * type R = IsString<never, { selection: 'filter' }> // never
 * type R = IsString<unknown, { selection: 'filter' }> // never
 * type R = IsString<string | boolean, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsString<string | 1> // boolean
 * type R = IsString<string | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsString<string, $IsString.$Branch> // $Then
 * type R = IsString<bigint, $IsString.$Branch> // $Else
 * ```
 */
export type IsString<T, $O extends IsString.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>
			$else: IsString.$<T, $O>
		}
	>
>

export namespace IsString {
	export type $Options = $Equality.$Options & $Exact.Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `string` or string literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], false]> extends true
		? $Distributive.Parse<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>
		: Assignable.$<T, string, $O>

	export type $UtilOptions = Assignable.$UtilOptions & $Exact.Options

	export type _D<T, $O extends $UtilOptions> = T extends string & infer U
		? U extends string
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
	export type _N<T, $O extends $UtilOptions> = [T] extends [string & infer U]
		? U extends string
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
}

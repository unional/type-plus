import type { $Equality } from '../$type/$equality.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $SpecialType } from '../$type/special/$special_type.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { Assignable } from '../predicates/assignable.js'
import type { _StringType } from './_string_type.js'

/**
 * 🎭 *validate*
 *
 * Validate if `T` is not a template literal(s).
 *
 * @example
 * ```ts
 * type R = IsNotTemplateLiteral<string> // true
 * type R = IsNotTemplateLiteral<'foo'> // true
 * type R = IsNotTemplateLiteral<`a${number}`> // false
 *
 * type R = IsNotTemplateLiteral<never> // true
 * type R = IsNotTemplateLiteral<unknown> // true
 * type R = IsNotTemplateLiteral<`${number}` | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not a template literal(s), otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotTemplateLiteral<`${number}`, { selection: 'filter' }> // never
 * type R = IsNotTemplateLiteral<'a', { selection: 'filter' }> // 'a'
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotTemplateLiteral<`${number}` | 1> // boolean
 * type R = IsNotTemplateLiteral<`${number}` | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotTemplateLiteral<`${number}`, $IsNotTemplateLiteral.$Branch> // $Else
 * type R = IsNotTemplateLiteral<bigint, $IsString.$Branch> // $Then
 * ```
 */
export type IsNotTemplateLiteral<T, $O extends IsNotTemplateLiteral.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>
			$else: IsNotTemplateLiteral.$<T, $O>
		}
	>
>

export namespace IsNotTemplateLiteral {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	export type $UtilOptions = Assignable.$UtilOptions

	export type $<T, $O extends $UtilOptions> = $Distributive.Parse<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>

	type _D<T, $O extends $UtilOptions> = T extends string
		? _StringType<T> extends infer R
			? R extends 'templateLiteral'
				? $ResolveBranch<T, $O, [$Else]>
				: $ResolveBranch<T, $O, [$Then]>
			: never
		: $ResolveBranch<T, $O, [$Then]>

	type _N<T, $O extends $UtilOptions> = _D<T, { $then: $Then; $else: $Else }> extends infer R
		? $Then | $Else extends R
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [R]>
		: never
}

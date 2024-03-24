import type { Assignable } from '../predicates/assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $IsDistributive } from '../type_plus/branch/$is_distributive.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'
import type { _StringType } from './_string_type.js'

/**
 * 🎭 *validate*
 *
 * Validate if `T` is a template literal(s).
 *
 * @example
 * ```ts
 * type R = IsTemplateLiteral<string> // false
 * type R = IsTemplateLiteral<'foo'> // false
 * type R = IsTemplateLiteral<`a${number}`> // true
 *
 * type R = IsTemplateLiteral<`a${number}` | `${bigint}c`> // true
 *
 * type R = IsTemplateLiteral<never> // false
 * type R = IsTemplateLiteral<unknown> // false
 * type R = IsTemplateLiteral<`${number}` | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is a template literal(s), otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsTemplateLiteral<`${number}`, { selection: 'filter' }> // `${number}`
 * type R = IsTemplateLiteral<'a', { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsTemplateLiteral<`${number}` | 1> // boolean
 * type R = IsTemplateLiteral<`${number}` | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsTemplateLiteral<`${number}`, $IsTemplateLiteral.$Branch> // $Then
 * type R = IsTemplateLiteral<bigint, $IsString.$Branch> // $Else
 * ```
 */
export type IsTemplateLiteral<T, $O extends IsTemplateLiteral.$Options = {}> =
	$SpecialType<T,
		$MergeOptions<$O,
			{
				$then: $ResolveBranch<T, $O, [$Else]>,
				$else: IsTemplateLiteral.$<T, $O>
			}
		>
	>

export namespace IsTemplateLiteral {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	export type $UtilOptions = Assignable.$UtilOptions

	export type $<T, $O extends $UtilOptions> =
		$IsDistributive<$O, { $then: _D<T, $O>, $else: _N<T, $O> }>

	type _D<T, $O extends $UtilOptions> =
		T extends string
		? _StringType<T> extends infer R
		? R extends 'templateLiteral'
		? $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
		: never
		: $ResolveBranch<T, $O, [$Else]>

	type _N<T, $O extends $UtilOptions> =
		_D<T, { $then: $Then, $else: $Else }> extends infer R
		? $Then | $Else extends R
		? $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [R]>
		: never
}

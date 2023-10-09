import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $ResolveSelection } from '../type_plus/branch/$resolve_selection.js'
import type { SelectInvertStrictWithDistribute } from '../type_plus/branch/select_invert_strict_with_distribute.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { IsStrictBoolean } from './is_strict_boolean.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not exactly `boolean`.
 *
 * @example
 * ```ts
 * type R = IsNotStrictBoolean<boolean> // false
 * type R = IsNotStrictBoolean<true> // true
 * type R = IsNotStrictBoolean<false> // true
 *
 * type R = IsNotStrictBoolean<number> // true
 * type R = IsNotStrictBoolean<unknown> // true
 * type R = IsNotStrictBoolean<string | boolean> // boolean
	* ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not exactly `boolean`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotStrictBoolean<boolean, { selection: 'filter' }> // never
 * type R = IsNotStrictBoolean<true, { selection: 'filter' }> // true
 * type R = IsNotStrictBoolean<false, { selection: 'filter' }> // false
 *
 * type R = IsNotStrictBoolean<number, { selection: 'filter' }> // number
 * type R = IsNotStrictBoolean<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotStrictBoolean<never, { selection: 'filter' }> // never
 * type R = IsNotStrictBoolean<string | boolean, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotStrictBoolean<boolean | 1> // boolean
 * type R = IsNotStrictBoolean<boolean | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotStrictBoolean<boolean, $SelectionBranch> // $Else
 * type R = IsNotStrictBoolean<true, $SelectionBranch> // $Then
 * type R = IsNotStrictBoolean<false, $SelectionBranch> // $Then
 * type R = IsNotStrictBoolean<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotStrictBoolean<T, $O extends IsNotStrictBoolean.$Options = {}> = IsAnyOrNever<
	T,
	$SelectionBranch
> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Then>
	: R extends $Else ? (
		$ResolveOptions<[$O['distributive'], SelectInvertStrictWithDistribute.$Default['distributive']]> extends true
		? (
			IsStrictBoolean._DistributeMap<T> extends infer R
			? ['aBcD' | 'AbCd' | 'abcd'] extends [R] ? $ResolveSelection<$O, T, $Else> | $ResolveSelection<$O, Exclude<T, boolean>, $Then>
			: ['aBcD' | 'AbCd'] extends [R] ? $ResolveSelection<$O, T, $Else>
			: ['aBcd' | 'Abcd'] extends [R] ? $ResolveSelection<$O, T, $Else> : $ResolveSelection<$O, T, $Then>
			: never
		)
		: SelectInvertStrictWithDistribute._N<T, boolean, $O>
	)
	: never : never

export namespace IsNotStrictBoolean {
	export type $Options = SelectInvertStrictWithDistribute.$Options
	export type $Default = SelectInvertStrictWithDistribute.$Default
	export type $Branch = SelectInvertStrictWithDistribute.$Branch
}

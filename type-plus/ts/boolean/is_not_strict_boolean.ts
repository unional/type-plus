import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { SelectInvertStrictWithDistribute } from '../type_plus/branch/select_invert_strict_with_distribute.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'
import type { IsStrictBoolean } from './is_strict_boolean.js'

/**
 * Is the type `T` not exactly `false`.
 *
 * ```ts
 * type R = IsNotStrictBoolean<boolean> // false
 *
 * type R = IsNotStrictBoolean<true> // true
 * type R = IsNotStrictBoolean<false> // false
 * type R = IsNotStrictBoolean<unknown> // true
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
		: [T, boolean] extends [boolean, T] ? $ResolveSelection<$O, T, $Else> : $ResolveSelection<$O, T, $Then>
	)
	: never : never

export namespace IsNotStrictBoolean {
	export type $Options = SelectInvertStrictWithDistribute.$Options
	export type $Default = SelectInvertStrictWithDistribute.$Default
	export type $Branch = SelectInvertStrictWithDistribute.$Branch
}

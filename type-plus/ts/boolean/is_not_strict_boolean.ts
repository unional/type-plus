import type { $Any } from '../any/any.js'
import type { IsAny } from '../any/is_any.js'
import type { IsNever } from '../never/is_never.js'
import type { $Never } from '../never/never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $ResolveSelection } from '../type_plus/branch/$resolve_selection.js'
import type { SelectInvertStrictWithDistribute } from '../type_plus/branch/select_invert_strict_with_distribute.js'
import type { $Else, $Then } from '../type_plus/branch/selection.js'
import type { IsUnknown } from '../unknown/is_unknown.js'
import type { $Unknown } from '../unknown/unknown.js'
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
export type IsNotStrictBoolean<T, $O extends IsNotStrictBoolean.$Options = {}> =
	IsAny<
		T,
		{
			$then: $ResolveBranch<T, $O, [$Any, $Then]>,
			$else: IsNever<
				T,
				{
					$then: $ResolveBranch<T, $O, [$Never, $Then]>,
					$else: IsUnknown<
						T,
						{
							$then: $ResolveBranch<T, $O, [$Unknown, $Then]>,
							$else:
							(
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
						}
					>
				}>
		}
	>

export namespace IsNotStrictBoolean {
	export type $Options = SelectInvertStrictWithDistribute.$Options
	export type $Default = SelectInvertStrictWithDistribute.$Default
	export type $Branch = SelectInvertStrictWithDistribute.$Branch
}

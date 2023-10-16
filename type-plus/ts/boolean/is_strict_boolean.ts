import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $SelectStrict } from '../type_plus/branch/$select_strict.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is exactly `boolean`.
 *
 * @example
 * ```ts
 * type R = IsStrictBoolean<boolean> // true
 * type R = IsStrictBoolean<true> // false
 * type R = IsStrictBoolean<false> // false
 *
 * type R = IsStrictBoolean<number> // false
 * type R = IsStrictBoolean<unknown> // false
 * type R = IsStrictBoolean<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is exactly `boolean`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsStrictBoolean<boolean, { selection: 'filter' }> // boolean
 * type R = IsStrictBoolean<true, { selection: 'filter' }> // never
 * type R = IsStrictBoolean<false, { selection: 'filter' }> // never
 *
 * type R = IsStrictBoolean<number, { selection: 'filter' }> // never
 * type R = IsStrictBoolean<unknown, { selection: 'filter' }> // never
 * type R = IsStrictBoolean<never, { selection: 'filter' }> // never
 * type R = IsStrictBoolean<string | boolean, { selection: 'filter' }> // boolean
 * type R = IsStrictBoolean<string | true, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsStrictBoolean<boolean | 1> // boolean
 * type R = IsStrictBoolean<boolean | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsStrictBoolean<boolean, $SelectionBranch> // $Then
 * type R = IsStrictBoolean<true, $SelectionBranch> // $Else
 * type R = IsStrictBoolean<false, $SelectionBranch> // $Else
 * type R = IsStrictBoolean<string, $SelectionBranch> // $Else
 * ```
 */
export type IsStrictBoolean<T, $O extends IsStrictBoolean.$Options = {}> = IsAnyOrNever<
	T,
	$SelectionBranch
> extends infer R
	? R extends $Then ? $ResolveBranch<T, $O, [$Else]>
	: R extends $Else ? (
		$ResolveOptions<[$O['distributive'], $SelectStrict.$Default['distributive']]> extends true
		? (
			IsStrictBoolean._DistributeMap<T> extends infer R
			? ['aBcD' | 'AbCd' | 'abcd'] extends [R] ? $ResolveBranch<boolean, $O, [$Then]> | $ResolveBranch<Exclude<T, boolean>, $O, [$Else]>
			: ['aBcD' | 'AbCd'] extends [R] ? $ResolveBranch<T, $O, [$Then]>
			: ['aBcd' | 'Abcd'] extends [R] ? $ResolveBranch<T, $O, [$Then]> : $ResolveBranch<T, $O, [$Else]>
			: never
		)
		: $SelectStrict._N<T, boolean, $O>
	)
	: never : never

export namespace IsStrictBoolean {
	export type $Options = $SelectStrict.$Options
	export type $Default = $SelectStrict.$Default
	export type $Branch = $SelectStrict.$Branch

	export type _DistributeMap<T> = T extends true
		? (T extends false
			? (true extends T
				? (false extends T ? 'ABCD' : 'ABCd')
				: (false extends T ? 'ABcD' : 'ABcd'))
			: (true extends T
				? (false extends T ? 'AbCD' : 'AbCd')
				: (false extends T ? 'AbcD' : 'Abcd'))
		)
		: (T extends false
			? (true extends T
				? (false extends T ? 'aBCD' : 'aBCd')
				: (false extends T ? 'aBcD' : 'aBcd'))
			: (true extends T
				? (false extends T ? 'abCD' : 'abCd')
				: (false extends T ? 'abcD' : 'abcd'))
		)
}

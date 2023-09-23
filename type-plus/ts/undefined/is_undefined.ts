import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $DistributiveDefault, $DistributiveOptions } from '../type_plus/branch/distributive.js'
import type { $ResolveBranch } from '../type_plus/branch/resolve_branch.js'
import type { $SelectionBranch, $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Validate if `T` is `undefined`.
 *
 * ```ts
 * type R = IsUndefined<undefined> // $Then
 *
 * type R = IsUndefined<never> // $Else
 * type R = IsUndefined<unknown> // $Else
 * type R = IsUndefined<string | boolean> // $Else
 * ```
 *
 * customize:
 * ```ts
 * type R = IsUndefined<undefined, $SelectionPredicate> // true
 * type R = IsUndefined<string, $SelectionPredicate> // false
 * ```
 *
 * distributive:
 * ```ts
 * type R = IsUndefined<undefined | 1> // $Then | $Else
 * type R = IsUndefined<undefined | 1, { distributive: false }> // $Else
 * ```
 */
export type IsUndefined<
	T,
	$O extends IsUndefined.$Options = IsUndefined.$Default
> = IsAnyOrNever<
	T,
	{
		$then: $ResolveBranch<[$O['$else'], false]>,
		$else: $ResolveBranch<[$O['distributive'], IsUndefined.$Default['distributive']]> extends true
		? T extends undefined ? $ResolveBranch<[$O['$then'], true]> : $ResolveBranch<[$O['$else'], false]>
		: [T] extends [undefined] ? $ResolveBranch<[$O['$then'], true]> : $ResolveBranch<[$O['$else'], false]>
	}
>

export namespace IsUndefined {
	export type $Options = $SelectionOptions & $DistributiveOptions
	export type $Default = $SelectionPredicate & $DistributiveDefault
	export type $Branch = $SelectionBranch & $DistributiveDefault
}

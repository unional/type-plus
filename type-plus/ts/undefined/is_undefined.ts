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
 * type R = IsUndefined<undefined> // true
 *
 * type R = IsUndefined<never> // false
 * type R = IsUndefined<unknown> // false
 * type R = IsUndefined<string | boolean> // false
 * ```
 *
 * customize:
 * ```ts
 * type R = IsUndefined<undefined, $SelectionBranch> // $Then
 * type R = IsUndefined<string, $SelectionBranch> // $Else
 * ```
 *
 * customize: disable distributive
 * ```ts
 * type R = IsUndefined<undefined | 1> // boolean
 * type R = IsUndefined<undefined | 1, { distributive: false }> // false
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

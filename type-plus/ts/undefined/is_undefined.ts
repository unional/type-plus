import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $DistributiveDefault, $DistributiveOptions } from '../type_plus/branch/distributive.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'
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
		$then: $ResolveOptions<[$O['$else'], false]>,
		$else: $ResolveOptions<[$O['distributive'], IsUndefined.$Default['distributive']]> extends true
		? T extends undefined ? $ResolveOptions<[$O['$then'], true]> : $ResolveOptions<[$O['$else'], false]>
		: [T] extends [undefined] ? $ResolveOptions<[$O['$then'], true]> : $ResolveOptions<[$O['$else'], false]>
	}
>

export namespace IsUndefined {
	export type $Options = $SelectionOptions & $DistributiveOptions
	export type $Default = $SelectionPredicate & $DistributiveDefault
	export type $Branch = $SelectionBranch & $DistributiveDefault
}

import type { $DistributiveDefault, $DistributiveOptions } from '../type_plus/branch/distributive.js'
import type { $FlipSelection, $SelectionBranch, $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'
import { type IsUndefined } from './is_undefined.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Validate if `T` is not `undefined`.
 *
 * ```ts
 * type R = IsNotUndefined<undefined> // false
 *
 * type R = IsNotUndefined<never> // true
 * type R = IsNotUndefined<unknown> // true
 * type R = IsNotUndefined<string | boolean> // true
 * ```
 *
 * customize: branch logic
 * ```ts
 * type R = IsNotUndefined<string, $SelectionBranch> // $Then
 * type R = IsNotUndefined<undefined, $SelectionBranch> // $Else
 * ```
 *
 * customize: disable distribution
 * ```ts
 * type R = IsNotUndefined<undefined | 1> // boolean
 * type R = IsNotUndefined<undefined | 1, { distributive: false }> // false
 * ```
 */
export type IsNotUndefined<
	T,
	$O extends IsNotUndefined.$Options = IsNotUndefined.$Default
> = IsUndefined<T, $FlipSelection<$O>>

export namespace IsNotUndefined {
	export type $Options = $SelectionOptions & $DistributiveOptions
	export type $Default = $SelectionPredicate & $DistributiveDefault
	export type $Branch = $SelectionBranch & $DistributiveDefault
}

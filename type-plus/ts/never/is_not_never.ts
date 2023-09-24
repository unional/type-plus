import type { $FlipSelection, $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'
import type { IsNever } from './is_never.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Validate if `T` not `never`.
 *
 * ```ts
 * type R = IsNotNever<1> // true
 *
 * type R = IsNotNever<never> // false
 * ```
 *
 * 🔢 *customize*: branching
 *
 * ```ts
 * type R = IsNotNever<never, $SelectionBranch> // $Else
 * type R = IsNotNever<1, $SelectionBranch> // $Then
 * ```
 */
export type IsNotNever<
	T,
	$Options extends $SelectionOptions = $SelectionPredicate
> = IsNever<T, $FlipSelection<$Options>>

import type { $FlipSelection, $SelectionBranch, $SelectionOptions } from '../type_plus/branch/selection.js'
import type { IsVoid } from './is_void.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Validate if `T` is not exactly `void`.
 *
 * ```ts
 * type R = IsNotVoid<1> // $Then
 *
 * type R = IsNotVoid<void> // $Else
 *
 * type R = IsNotVoid<1, $SelectionPredicate> // true
 * type R = IsNotVoid<void, $SelectionPredicate> // false
 * ```
 */

export type IsNotVoid<
	T,
	$O extends $SelectionOptions = $SelectionBranch
> = IsVoid<T, $FlipSelection<$O>>

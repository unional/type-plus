import type { $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'
import type { NeverType } from './never_type.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Validate if `T` is exactly `never`.
 *
 * @example
 * ```ts
 * type R = IsNever<never> // true
 *
 * type R = IsNever<1> // false
 * ```
 */

export type IsNever<
	T,
	$Options extends $SelectionOptions = $SelectionPredicate
> = NeverType<T, $Options>

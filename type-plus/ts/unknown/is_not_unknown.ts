import type { $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'
import type { NotUnknownType } from './not_unknown_type.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Is the type `T` not exactly `unknown`.
 *
 * ```ts
 * type R = IsNotUnknown<unknown> // false
 *
 * type R = IsNotUnknown<never> // true
 * type R = IsNotUnknown<number> // true
 * type R = IsNotUnknown<string | boolean> // true
 * ```
 */

export type IsNotUnknown<
	T,
	$Options extends $SelectionOptions = $SelectionPredicate
> = NotUnknownType<T, $Options>

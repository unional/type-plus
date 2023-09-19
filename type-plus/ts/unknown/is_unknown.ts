import type { $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'
import { type UnknownType } from './unknown_type.js'

/**
 * Is the type `T` exactly `unknown`.
 *
 * ```ts
 * type R = IsUnknown<unknown> // true
 *
 * type R = IsUnknown<number> // false
 * type R = IsUnknown<never> // false
 * ```
 */

export type IsUnknown<
	T,
	$Options extends $SelectionOptions = $SelectionPredicate
> = UnknownType<T, $Options>

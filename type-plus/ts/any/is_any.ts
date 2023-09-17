import type { $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'
import type { AnyType } from './any_type.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is exactly `any`.
 *
 * @example
 * ```ts
 * type R = IsAny<any> // true
 *
 * type R = IsAny<never> // false
 * type R = IsAny<unknown> // false
 * type R = IsAny<string | boolean> // false
 * ```
 */
export type IsAny<
	T,
	$Options extends $SelectionOptions = $SelectionPredicate
> = AnyType<T, $Options>

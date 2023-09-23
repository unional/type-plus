import type { $FlipSelection, $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'
import type { IsAny } from './is_any.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not exactly `any`.
 *
 * @example
 * ```ts
 * import type { IsNotAny } from 'type-plus'
 *
 * type R = IsNotAny<any> // false
 *
 * type R = IsNotAny<never> // true
 * type R = IsNotAny<unknown> // true
 * type R = IsNotAny<string | boolean> // true
 * ```
 */
export type IsNotAny<
	T,
	$Options extends $SelectionOptions = $SelectionPredicate
> = IsAny<T, $FlipSelection<$Options>>

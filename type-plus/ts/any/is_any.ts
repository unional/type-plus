import type { $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Validate if `T` is exactly `any`.
 *
 * ```ts
 * type R = IsAny<any> // true
 *
 * type R = IsAny<never> // false
 * type R = IsAny<unknown> // false
 * type R = IsAny<string | boolean> // false
 * ```
 *
 * customize: as predicate/validate
 * ```ts
 * type R = IsAny<any, $SelectionPredicate> // true
 * type R = IsAny<string, $SelectionPredicate> // false
 * ```
 */
export type IsAny<
	T,
	$O extends $SelectionOptions = $SelectionPredicate
> = 0 extends 1 & T ? $O['$then'] : $O['$else']

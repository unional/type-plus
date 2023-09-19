import type { AnyType } from '../any/any_type.js'
import type { NeverType } from '../never/never_type.js'
import type { $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 * 🩳 *shortcut*
 *
 * Validate if `T` is either exactly `any` or exactly `never`.
 *
 * @example
 * ```ts
 * type R = IsAnyOrNever<any> // true
 * type R = IsAnyOrNever<never> // true
 *
 * type R = IsAnyOrNever<1> // false
 * type R = IsAnyOrNever<unknown> // false
 * ```
 */
export type IsAnyOrNever<
	T,
	$Options extends $SelectionOptions = $SelectionPredicate
> = NeverType<T, {
	$then: $Options['$then'],
	$else: AnyType<T, $Options>
}>

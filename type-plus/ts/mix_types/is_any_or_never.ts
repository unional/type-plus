import type { AnyType } from '../any/any_type.js'
import type { NeverType } from '../never/never_type.js'
import type { $SelectionBranch, $SelectionOptions } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 * 🩳 *shortcut*
 *
 * Validate if `T` is either exactly `any` or exactly `never`.
 *
 * @example
 * ```ts
 * type R = IsAnyOrNever<any> // $Then
 * type R = IsAnyOrNever<never> // $Then
 *
 * type R = IsAnyOrNever<1> // $Else
 * type R = IsAnyOrNever<unknown> // $Else
 *
 * type R = IsAnyOrNever<never, $SelectionPredicate> // true
 * type R = IsAnyOrNever<'a', $SelectionPredicate> // false
 * ```
 */
export type IsAnyOrNever<
	T,
	$Options extends $SelectionOptions = $SelectionBranch
> = NeverType<T, {
	$then: $Options['$then'],
	$else: AnyType<T, $Options>
}>

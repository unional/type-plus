import type { $FlipSelection, $SelectionFilter, $SelectionOptions } from '../type_plus/branch/selection.js'
import type { AnyType } from './any_type.js'

/**
 * 🌪️ *filter*
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not exactly `any`.
 *
 * ```ts
 * type R = NotAnyType<any> // never
 *
 * type R = NotAnyType<never> // never
 * type R = NotAnyType<unknown> // unknown
 * type R = NotAnyType<string | boolean> // string | boolean
 * ```
 *
 * 🔢 *customize*: as predicate/validate (= `IsNotAny`)
 * ```ts
 * type R = NotAnyType<string, $SelectionPredicate> // true
 * type R = NotAnyType<any, $SelectionPredicate> // false
 * ```
 *
 * 🔢 *customize*: branching
 * ```ts
 * type R = NotAnyType<string, $SelectionBranch> // $Then
 * type R = NotAnyType<any, $SelectionBranch> // $Else
 * ```
 */
export type NotAnyType<
	T,
	$Options extends $SelectionOptions = $SelectionFilter<T>
> = AnyType<T, $FlipSelection<$Options>>

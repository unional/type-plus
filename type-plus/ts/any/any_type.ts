import type { $SelectionFilter, $SelectionOptions } from '../type_plus/branch/selection.js'

/**
 * 🌪️ *filter*
 * 🔢 *customize*
 *
 * Filter to ensure `T` is exactly `any`.
 *
 * ```ts
 * type R = AnyType<any> // any
 *
 * type R = AnyType<never> // never
 * type R = AnyType<unknown> // never
 * type R = AnyType<string | boolean> // never
 * ```
 *
 * 🔢 *customize*: as predicate/validate (= `IsAny`)
 *
 * ```ts
 * type R = AnyType<any, $SelectionPredicate> // true
 * type R = AnyType<string, $SelectionPredicate> // false
 * ```
 *
 * 🔢 *customize*: branching
 *
 * ```ts
 * type R = AnyType<any, $SelectionBranch> // $Then
 * type R = AnyType<string, $SelectionBranch> // $Else
 * ```
 */
export type AnyType<
	T,
	$O extends $SelectionOptions = $SelectionFilter<T>
> = 0 extends 1 & T ? $O['$then'] : $O['$else']

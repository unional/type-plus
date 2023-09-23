import type { $SelectionOptions } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'

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
 *
 * ```ts
 * type R = NotAnyType<string, $SelectionPredicate> // true
 * type R = NotAnyType<any, $SelectionPredicate> // false
 * ```
 *
 * 🔢 *customize*: branching
 *
 * ```ts
 * type R = NotAnyType<string, $SelectionBranch> // $Then
 * type R = NotAnyType<any, $SelectionBranch> // $Else
 * ```
 */
export type NotAnyType<
	T,
	$O extends $SelectionOptions = $SelectionOptions
> = 0 extends 1 & T ? $ResolveOptions<[$O['$else'], never]> : $ResolveOptions<[$O['$then'], T]>

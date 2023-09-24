import type { $SelectionOptions } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'
import type { $NotNever } from './never.js'

/**
 * 🌪️ *filter*
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `never`, otherwise returns `$NotNever`.
 *
 * ```ts
 * type R = NeverType<never> // never
 *
 * type R = NeverType<1> // $NotNever
 * ```
 *
 * 🔢 *customize*: as predicate/validate (= `IsNever`)
 *
 * ```ts
 * type R = NeverType<never, $SelectionPredicate> // true
 * type R = NeverType<1, $SelectionPredicate> // false
 * ```
 *
 * 🔢 *customize*: branching
 *
 * ```ts
 * type R = NeverType<never, $SelectionBranch> // $Then
 * type R = NeverType<1, $SelectionBranch> // $Else
 * ```
 */
export type NeverType<
	T,
	$O extends $SelectionOptions = { $then: T, $else: $NotNever }
> = [T, never] extends [never, T]
? $ResolveOptions<[$O['$then'], T]>
: $ResolveOptions<[$O['$else'], $NotNever]>

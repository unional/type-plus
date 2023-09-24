import type { $Else, $SelectionBranch, $SelectionOptions, $Then } from '../type_plus/branch/selection.js'
import type { IsNever } from './is_never.js'
import type { $Never } from './never.js'

/**
 * 🌪️ *filter*
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `never`, otherwise returns `$Never`.
 *
 * ```ts
 * type R = NotNeverType<1> // 1
 *
 * type R = NotNeverType<never> // $Never
 * ```
 *
 * 🔢 *customize*: as predicate/validate (= `IsNotNever`)
 *
 * ```ts
 * type R = NotNeverType<1, $SelectionPredicate> // true
 * type R = NotNeverType<never, $SelectionPredicate> // false
 * ```
 *
 * 🔢 *customize*: branching
 *
 * ```ts
 * type R = NotNeverType<never, $SelectionBranch> // $Else
 * type R = NotNeverType<1, $SelectionBranch> // $Then
 * ```
 */
export type NotNeverType<
	T,
	$Options extends $SelectionOptions = { $then: T, $else: $Never }
> = IsNever<T, $SelectionBranch> extends infer R
	? R extends $Then ? $Options['$else']
	: R extends $Else ? $Options['$then']
	: never : never

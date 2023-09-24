import type { $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Validate if `T` is `never`.
 *
 * ```ts
 * type R = IsNever<never> // true
 *
 * type R = IsNever<1> // false
 * ```
 *
 * 🔢 *customize*: branching
 *
 * ```ts
 * type R = IsNever<never, $SelectionBranch> // $Then
 * type R = IsNever<1, $SelectionBranch> // $Else
 * ```
 */
export type IsNever<
	T,
	$O extends $SelectionOptions = $SelectionPredicate
> = [T, never] extends [never, T]
	? $ResolveOptions<[$O['$then'], true]>
	: $ResolveOptions<[$O['$else'], false]>


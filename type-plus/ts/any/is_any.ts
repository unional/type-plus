import type { $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'

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
 * 🔢 *customize*: branching
 *
 * ```ts
 * type R = IsAny<any, $SelectionBranch> // $Then
 * type R = IsAny<string, $SelectionBranch> // $Else
 * ```
 */
export type IsAny<
	T,
	$O extends $SelectionOptions = $SelectionPredicate
> = 0 extends 1 & T ? $ResolveOptions<[$O['$then'], true]> : $ResolveOptions<[$O['$else'], false]>

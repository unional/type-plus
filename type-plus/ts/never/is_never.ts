import type { $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Validate if `T` is exactly `never`.
 *
 * @example
 * ```ts
 * type R = IsNever<never> // true
 *
 * type R = IsNever<1> // false
 * ```
 */

export type IsNever<
	T,
	$O extends $SelectionOptions = $SelectionPredicate
> = [T, never] extends [never, T]
	? $O['$then']
	// ? $ResolveOptions<[$O['$then'], true]>
	// : $O['$else']
	: $ResolveOptions<[$O['$else'], false]>


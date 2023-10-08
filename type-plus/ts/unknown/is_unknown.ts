import type { IsAny } from '../any/is_any.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $SelectionPredicate, $Then } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsUnknown<unknown> // true
 *
 * type R = IsUnknown<number> // false
 * type R = IsUnknown<never> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsUnknown<unknown, { selection: 'filter' }> // unknown
 *
 * type R = IsUnknown<number, { selection: 'filter' }> // never
 * type R = IsUnknown<never, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsUnknown<unknown, $SelectionBranch> // $Then
 * type R = IsUnknown<string, $SelectionBranch> // $Else
 * ```
 */
export type IsUnknown<
	T,
	O extends $SelectionOptions = $SelectionPredicate
> = IsAny<
	T,
	$SelectionBranch> extends infer R
	? R extends $Then ? $ResolveSelection<O, T, $Else>
	: (R extends $Else
		? ([T, unknown] extends [unknown, T]
			? $ResolveSelection<O, T, $Then>
			: $ResolveSelection<O, T, $Else>)
		: never)
	: never



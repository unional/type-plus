import type { IsAny } from '../any/is_any.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $SelectionPredicate, $Then } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsNotUnknown<unknown> // false
 *
 * type R = IsNotUnknown<number> // true
 * type R = IsNotUnknown<never> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsNotUnknown<unknown, { selection: 'filter' }> // never
 *
 * type R = IsNotUnknown<number, { selection: 'filter' }> // number
 * type R = IsNotUnknown<never, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotUnknown<unknown, $SelectionBranch> // $Else
 * type R = IsNotUnknown<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotUnknown<
	T,
	O extends $SelectionOptions = $SelectionPredicate
> = IsAny<
	T,
	$SelectionBranch> extends infer R
	? R extends $Then ? $ResolveSelection<O, T, $Then>
	: (R extends $Else
		? ([T, unknown] extends [unknown, T]
			? $ResolveSelection<O, T, $Else>
			: $ResolveSelection<O, T, $Then>)
		: never)
	: never



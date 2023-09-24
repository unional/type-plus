import type { IsAny } from '../any/is_any.js'
import type { $Else, $SelectionBranch, $SelectionFilter, $SelectionOptions, $Then } from '../type_plus/branch/selection.js'

/**
 * Check if the type `T` is exactly `unknown`.
 *
 * ```ts
 * type R = UnknownType<unknown> // unknown
 *
 * type R = UnknownType<number> // never
 * type R = UnknownType<never> // never
 * ```
 */
export type UnknownType<
	T,
	$Options extends $SelectionOptions = $SelectionFilter<T>
> = IsAny<
	T,
	$SelectionBranch> extends infer R
	? R extends $Then ? $Options['$else']
	: R extends $Else ? [T, unknown] extends [unknown, T] ? $Options['$then'] : $Options['$else']
	: never : never


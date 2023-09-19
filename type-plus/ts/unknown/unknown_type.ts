import type { IsAny } from '../any/is_any.js'
import type { $SelectionFilter, $SelectionOptions } from '../type_plus/branch/selection.js'

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
	{
		$then: $Options['$else'],
		$else: [T, unknown] extends [unknown, T] ? $Options['$then'] : $Options['$else']
	}
>

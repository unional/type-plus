import type { $SelectionFilter, $SelectionOptions } from '../type_plus/branch/selection.js'

/**
 * 🌪️ *filter*
 *
 * Filter `T` to ensure it is exactly `any`.
 *
 * @example
 * ```ts
 * type R = AnyType<any> // any
 *
 * type R = AnyType<never> // never
 * type R = AnyType<unknown> // never
 * type R = AnyType<string | boolean> // never
 * ```
 */
export type AnyType<
	T,
	$Options extends $SelectionOptions = $SelectionFilter<T>
> = 0 extends 1 & T ? $Options['$then'] : $Options['$else']

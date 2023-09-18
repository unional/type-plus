import type { $SelectionOptions } from '../type_plus/branch/selection.js'
import type { $NotNever } from './never.js'

/**
 * 🌪️ *filter*
 * 🔢 *customize*
 *
 * Filter to ensure `T` is exactly `never`.
 *
 * If it is not, returns `$NotNever`.
 *
 * @example
 * ```ts
 * type R = NeverType<never> // never
 *
 * type R = NeverType<1> // '$NotNever'
 * ```
 */
export type NeverType<
	T,
	$Options extends $SelectionOptions = { $then: never, $else: $NotNever }
> = [T, never] extends [never, T] ? $Options['$then'] : $Options['$else']

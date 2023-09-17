import type { $FlipSelection, $SelectionFilter, $SelectionOptions } from '../type_plus/branch/selection.js'
import type { AnyType } from './any_type.js'

/**
 * 🌪️ *filter*
 *
 * Filter `T` to ensure it is not exactly `any`.
 *
 * @example
 * ```ts
 * type R = NotAnyType<any> // never
 *
 * type R = NotAnyType<never> // never
 * type R = NotAnyType<unknown> // unknown
 * type R = NotAnyType<string | boolean> // string | boolean
 * ```
 */
export type NotAnyType<
	T,
	$Options extends $SelectionOptions = $SelectionFilter<T>
> = AnyType<T, $FlipSelection<$Options>>

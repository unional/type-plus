import type { AnyType } from '../any/any_type.js'
import type { NeverType } from '../never/never_type.js'
import type { $SelectionFilter, $SelectionOptions } from '../type_plus/branch/selection.js'

/**
 * Parse `T` to ensure it is either exactly `any` or exactly `never`.
 *
 * 🌪️ *filter*
 * 🔢 *customize*
 * 🩳 *shortcut*
 *
 * @example
 * ```ts
 * type R = AnyOrNeverType<any> // any
 * type R = AnyOrNeverType<never> // never
 * type R = AnyOrNeverType<unknown> // never
 * type R = AnyOrNeverType<string | boolean> // never
 *
 * type R = AnyOrNeverType<never, 1, 2> // 1
 * type R = AnyOrNeverType<unknown, 1, 2> // 2
 * ```
 */
export type AnyOrNeverType<
	T,
	$Options extends $SelectionOptions = $SelectionFilter<T>
> = NeverType<T, {
	$then: $Options['$then'],
	$else: AnyType<T, $Options>
}>

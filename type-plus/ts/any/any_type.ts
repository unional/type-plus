import type { TypePlusOptions } from '../utils/options.js'

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
	Options extends TypePlusOptions.Selection = TypePlusOptions.FilterSelection<T>
> = 0 extends 1 & T ? Options['$then'] : Options['$else']

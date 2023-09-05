
import type { AnyRecord } from './any_record.js'
import type { KeyTypes } from './KeyTypes.js'

/**
 * Validate if the key `K` in `T` is optional.
 *
 * 🎭 *validate*
 *
 * @example
 * ```ts
 * IsOptionalKey({ a: 1 }, 'a') // false
 * IsOptionalKey({ a?: 1 }, 'a') // true
 * ```
 */
export type IsOptionalKey<T, K, Then = true, Else = false> = K extends OptionalKeys<T> ? Then : Else

/**
 * Gets the optional keys of `T`.
 *
 * 🦴 *utilities*
 *
 * @example
 * ```ts
 * OptionalKeys<{ a: 1 }> // never
 * OptionalKeys<{ a?: 1, b: number }> // 'a'
 * ```
 */
export type OptionalKeys<T> = T extends unknown
	? { [k in keyof T]-?: Record<KeyTypes, any> extends Pick<T, k> ? k : never }[keyof T]
	: never

/**
 * Parse `T` to keep only the optional properties.
 */
export type OptionalProps<T extends AnyRecord> = T extends unknown
	? { [k in OptionalKeys<T>]?: T[k] }
	: never

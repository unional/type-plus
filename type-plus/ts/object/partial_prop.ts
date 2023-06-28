import type { AnyRecord } from './AnyRecord.js'

/**
 * Validate if the key `K` in `T` is optional.
 *
 * 🎭 *validate*
 *
 * @example
 * ```ts
 * IsOptionalProp({ a: 1 }, 'a') // false
 * IsOptionalProp({ a?: 1 }, 'a') // true
 * ```
 */
export type IsOptionalKey<T, K extends keyof T, Then = true, Else = false> =
	{ [k in K]?: T[k] } extends { [k in K]: T[k] }
	? Then
	: Else

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
export type OptionalKeys<T extends AnyRecord> = Exclude<
	{ [k in keyof T]: IsOptionalKey<T, k, k, never> }[keyof T],
	undefined
>

import type { AnyRecord } from './AnyRecord.js'

/**
 * Validate `T[K]` is partial.
 *
 * @example
 * ```ts
 * IsPartialProp({ a: 1 }, 'a') // false
 * IsPartialProp({ a?: 1 }, 'a') // true
 * ```
 */
export type IsPartialProp<T, K extends keyof T, Then = true, Else = false> = { [k in K]?: T[k] } extends {
	[k in K]: T[k]
}
	? Then
	: Else

/**
 * Gets the keys of `T` that are partial.
 *
 * @example
 * ```ts
 * PartialPropKeys<{ a: 1 }> // never
 * PartialPropKeys<{ a?: 1, b: number }> // 'a'
 * ```
 */
export type PartialPropKeys<T extends AnyRecord> = Exclude<
	{ [k in keyof T]: IsPartialProp<T, k, k, never> }[keyof T],
	undefined
>

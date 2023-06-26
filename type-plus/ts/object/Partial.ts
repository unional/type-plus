import type { UnionKeys } from '../union_keys.js'
import type { Omit } from './omit.js'
import type { Pick } from './pick.js'

/**
 * An alternative `Partial<T>` type that works with `exactOptionalPropertyTypes`
 */
export type Partial<T> = { [P in keyof T]?: T[P] | undefined }

/**
 * Apply `Partial<>` on the selected properties.
 */
export type PartialPick<T, U extends UnionKeys<T>> = T extends T ? Omit<T, U> & Partial<Pick<T, U>> : never

/**
 * @deprecated replaced by `PartialOmit`
 */
export type PartialExcept<T, U extends UnionKeys<T>> = T extends T ? Pick<T, U> & Partial<Omit<T, U>> : never

/**
 * Apply `Partial<>` on all not selected properties.
 */
export type PartialOmit<T, U extends UnionKeys<T>> = T extends T ? Pick<T, U> & Partial<Omit<T, U>> : never

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

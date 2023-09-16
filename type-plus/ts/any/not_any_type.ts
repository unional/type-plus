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
export type NotAnyType<T, Then = T, Else = never> = AnyType<T, { $then: Else, $else: Then }>

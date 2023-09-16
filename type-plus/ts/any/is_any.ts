import type { AnyType } from './any_type.js'

/**
 * 🎭 *validate*
 *
 * Validate if `T` is exactly `any`.
 *
 * @example
 * ```ts
 * type R = IsAny<any> // true
 *
 * type R = IsAny<never> // false
 * type R = IsAny<unknown> // false
 * type R = IsAny<string | boolean> // false
 * ```
 */
export type IsAny<T, Then = true, Else = false> = AnyType<T, { $then: Then, $else: Else }>

import type { AnyType } from './any_type.js'

/**
 * 🎭 *validate*
 *
 * Validate if `T` is not exactly `any`.
 *
 * @example
 * ```ts
 * import type { IsNotAny } from 'type-plus'
 *
 * type R = IsNotAny<any> // false
 *
 * type R = IsNotAny<never> // true
 * type R = IsNotAny<unknown> // true
 * type R = IsNotAny<string | boolean> // true
 * ```
 */
export type IsNotAny<T, Then = true, Else = false> = AnyType<T, { $then: Else, $else: Then }>

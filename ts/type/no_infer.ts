import type { IsNull } from '../null/null_type.js'
import type { Or } from '../predicates/logical.js'
import type { IsUndefined } from '../undefined/undefined_type.js'

/**
 * Prevents inference of a type parameter `T`.
 *
 * 🦴 *utilities*
 *
 * @ajafff original version author
 * @see https://github.com/microsoft/TypeScript/issues/14829#issuecomment-298425341
 *
 * @example
 * ```ts
 * function assertEqual<T>(a: T, b: NoInfer<T>) {
 *   return a === b
 * }
 *
 * assertEqual(123, 324) // OK
 * assertEqual(123, 'abc') // Error
 * assertEqual({ x: 1 }, { x: 1, y: 2 }) // Error
 * ```
 *
 * A build-in `NoInfer` is coming soon.
 * @see https://github.com/microsoft/TypeScript/pull/52968
 */
export type NoInfer<T> = Or<IsNull<T>, IsUndefined<T>, T, T & {}>

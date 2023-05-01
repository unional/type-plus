import { IsNull } from '../null/null_type.js'
import { Or } from '../predicates/logical.js'
import { IsUndefined } from '../undefined/undefined_type.js'

/**
 * Prevents inference of a type parameter `T`.
 *
 * A build-in type `NoInfer` is coming soon.
 * @see https://github.com/microsoft/TypeScript/pull/52968
 *
 * @by @ajafff
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
 */
export type NoInfer<T> = Or<IsNull<T>, IsUndefined<T>, T, T & {}>

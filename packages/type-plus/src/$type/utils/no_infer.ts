import type { IsNull } from '../../null/is_null.js'
import type { Or } from '../../predicates/logical.js'
import type { $SelectionPredicate } from '../../type_plus/branch/$selection.js'
import type { IsUndefined } from '../../undefined/is_undefined.js'

/**
 * Prevents inference of a type parameter `T`.
 *
 * 🦴 *utilities*
 *
 * @deprecated TypeScript 5.4 provides a built-in `NoInfer`.
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
 */
export type NoInfer<T> = Or<IsNull<T>, IsUndefined<T, $SelectionPredicate>, T, T & {}>

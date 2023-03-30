import type { IsNever } from '../never/never_type.js'
import type { IsAny } from './any_type.js'

/**
 * Is `T` type `any` or `never`.
 *
 * ```ts
 * import type { IsAnyOrNever } from 'type-plus'
 *
 * type R = IsAnyOrNever<any> // true
 * type R = IsAnyOrNever<never> // true
 *
 * type R = IsAnyOrNever<1> // false
 * type R = IsAnyOrNever<unknown> // false
 * ```
 */
export type IsAnyOrNever<T, Then = true, Else = false> = IsNever<T, Then, IsAny<T, Then, Else>>

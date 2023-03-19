import type { IsNever } from '../PrimitiveTypes.js'
import type { Not } from '../predicates/logical.js'

const any = Symbol('any')
type UniqueAnySymbol = typeof any

/**
 * Is the type `T` exactly `any`.
 *
 * ```
 * import type { IsAny } from 'type-plus'
 *
 * type R = IsAny<any> // true
 *
 * type R = IsAny<never> // false
 * type R = IsAny<unknown> // false
 * type R = IsAny<string | boolean> // false
 * ```
 */
export type IsAny<T, Then = true, Else = false> = [T] extends [UniqueAnySymbol] ? Not<IsNever<T>, Then, Else> : Else

/**
 * Check if the type `T` is exactly `any`.
 *
 * ```
 * import type { AnyType } from 'type-plus'
 *
 * type R = AnyType<any> // any
 *
 * type R = AnyType<never> // never
 * type R = AnyType<unknown> // never
 * type R = AnyType<string | boolean> // never
 * ```
 */
export type AnyType<T, Then = T, Else = never> = IsAny<T, Then, Else>

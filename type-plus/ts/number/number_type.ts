import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'

/**
 * Check if the type `T` is `number`.
 *
 * ```ts
 * type R = NumberType<number> // true
 * type R = NumberType<1> // true
 *
 * type R = NumberType<never> // false
 * type R = NumberType<unknown> // false
 * ```
 */
export type NumberType<T, Then = T, Else = never> = IsAnyOrNever<T, Else, [T] extends [number] ? Then : Else>

/**
 * Is the type `T` is `number`.
 *
 * ```ts
 * type R = IsNumber<number> // true
 * type R = IsNumber<1> // true
 *
 * type R = IsNumber<never> // false
 * type R = IsNumber<unknown> // false
 * ```
 */
export type IsNumber<T, Then = true, Else = false> = NumberType<T, Then, Else>

/**
 * Check if the type `T` is not `number`.
 *
 * ```ts
 * type R = NotNumberType<number> // false
 * type R = NotNumberType<1> // false
 *
 * type R = NotNumberType<never> // true
 * type R = NotNumberType<unknown> // true
 * ```
 */
export type NotNumberType<T, Then = T, Else = never> = NumberType<T, Else, Then>

/**
 * Is the type `T` not `number`.
 *
 * ```ts
 * type R = IsNotNumber<number> // false
 * type R = IsNotNumber<1> // false
 *
 * type R = IsNotNumber<never> // true
 * type R = IsNotNumber<unknown> // true
 * ```
 */
export type IsNotNumber<T, Then = true, Else = false> = NumberType<T, Else, Then>

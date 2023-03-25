import type { IsAny } from '../any/any_type.js'

/**
 * Check if the type `T` is exactly the type `number` and not numeric literals.
 *
 * ```ts
 * import type { NumberType } from 'type-plus'
 *
 * type R = NumberType<number> // true
 * type R = NumberType<1> // false
 *
 * type R = NumberType<never> // false
 * type R = NumberType<unknown> // false
 * ```
 */
export type NumberType<T, Then = T, Else = never> = IsAny<
	T,
	Else,
	[number, T] extends [T, number] ? Then : Else
>

/**
 * Is the type `T` exactly the type `number` and not numeric literals.
 *
 * ```ts
 * import type { IsNumber } from 'type-plus'
 *
 * type R = IsNumber<number> // true
 * type R = IsNumber<1> // false
 *
 * type R = IsNumber<never> // false
 * type R = IsNumber<unknown> // false
 * ```
 */
export type IsNumber<T, Then = true, Else = false> = NumberType<T, Then, Else>

/**
 * Check if the type `T` is not the type `number` or numeric literals.
 *
 * ```ts
 * import type { NotNumberType } from 'type-plus'
 *
 * type R = NotNumberType<number> // false
 * type R = NotNumberType<1> // true
 *
 * type R = NotNumberType<never> // true
 * type R = NotNumberType<unknown> // true
 * ```
 */
export type NotNumberType<T, Then = T, Else = never> = NumberType<T, Else, Then>

/**
 * Is the type `T` not the type `number` or numeric literals.
 *
 * ```ts
 * import type { IsNotNumber } from 'type-plus'
 *
 * type R = IsNotNumber<number> // false
 * type R = IsNotNumber<1> // true
 *
 * type R = IsNotNumber<never> // true
 * type R = IsNotNumber<unknown> // true
 * ```
 */
export type IsNotNumber<T, Then = true, Else = false> = NumberType<T, Else, Then>

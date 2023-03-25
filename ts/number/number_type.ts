import type { IsAny } from '../any/any_type.js'

/**
 * Check if the type `T` is exactly the type `number` and not numeric literals.
 *
 * ```
 * import type { NumberType } from 'type-plus'
 *
 * type R = NumberType<number> // true
 * type R = NumberType<1> // false
 * ```
 */
export type NumberType<T, Then = T, Else = never> = IsAny<
	T,
	Else,
	[number, T] extends [T, number] ? Then : Else
>

export type IsNumber<T, Then = true, Else = false> = NumberType<T, Then, Else>

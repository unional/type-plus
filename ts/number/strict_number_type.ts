import type { IsAny } from '../any/any_type.js'

/**
 * Check if the type `T` is exactly the type `number` and not numeric literals.
 *
 * ```ts
 * import type { StrictNumberType } from 'type-plus'
 *
 * type R = StrictNumberType<number> // true
 * type R = StrictNumberType<1> // false
 *
 * type R = StrictNumberType<never> // false
 * type R = StrictNumberType<unknown> // false
 * ```
 */
export type StrictNumberType<T, Then = T, Else = never> = IsAny<
	T,
	Else,
	[number, T] extends [T, number] ? Then : Else
>

/**
 * Is the type `T` exactly the type `number` and not numeric literals.
 *
 * ```ts
 * import type { IsStrictNumber } from 'type-plus'
 *
 * type R = IsStrictNumber<number> // true
 * type R = IsStrictNumber<1> // false
 *
 * type R = IsStrictNumber<never> // false
 * type R = IsStrictNumber<unknown> // false
 * ```
 */
export type IsStrictNumber<T, Then = true, Else = false> = StrictNumberType<T, Then, Else>

/**
 * Check if the type `T` is not the type `number` or numeric literals.
 *
 * ```ts
 * import type { NotStictNumberType } from 'type-plus'
 *
 * type R = NotStictNumberType<number> // false
 * type R = NotStictNumberType<1> // true
 *
 * type R = NotStictNumberType<never> // true
 * type R = NotStictNumberType<unknown> // true
 * ```
 */
export type NotStrictNumberType<T, Then = T, Else = never> = StrictNumberType<T, Else, Then>

/**
 * Is the type `T` not the type `number` or numeric literals.
 *
 * ```ts
 * import type { IsNotStrictNumber } from 'type-plus'
 *
 * type R = IsNotStrictNumber<number> // false
 * type R = IsNotStrictNumber<1> // true
 *
 * type R = IsNotStrictNumber<never> // true
 * type R = IsNotStrictNumber<unknown> // true
 * ```
 */
export type IsNotStrictNumber<T, Then = true, Else = false> = StrictNumberType<T, Else, Then>

import type { IsAny } from '../any/is_any.js'

/**
 * Check if the type `T` is exactly the type `number` and not numeric literals.
 *
 * Note that if `T` is guaranteed to be a `number`, e.g. `SomeArray['length']`,
 *
 * A simple `number extends SomeArray['length'] ? Then, Else` is sufficient.
 *
 * @example
 * ```ts
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
 * Note that if `T` is guaranteed to be a `number`, e.g. `SomeArray['length']`,
 *
 * A simple `number extends SomeArray['length'] ? Then, Else` is sufficient.
 *
 * @example
 * ```ts
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
 * @example
 * ```ts
 * type R = NotStrictNumberType<number> // false
 * type R = NotStrictNumberType<1> // true
 *
 * type R = NotStrictNumberType<never> // true
 * type R = NotStrictNumberType<unknown> // true
 * ```
 */
export type NotStrictNumberType<T, Then = T, Else = never> = StrictNumberType<T, Else, Then>

/**
 * Is the type `T` not the type `number` or numeric literals.
 *
 * @example
 * ```ts
 * type R = IsNotStrictNumber<number> // false
 * type R = IsNotStrictNumber<1> // true
 *
 * type R = IsNotStrictNumber<never> // true
 * type R = IsNotStrictNumber<unknown> // true
 * ```
 */
export type IsNotStrictNumber<T, Then = true, Else = false> = StrictNumberType<T, Else, Then>

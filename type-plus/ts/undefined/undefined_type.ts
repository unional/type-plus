import type { IsAny } from '../any/is_any.js'
/**
 * Check if the type `T` is exactly `undefined`.
 *
 * ```ts
 * type R = UndefinedType<undefined> // undefined
 *
 * type R = UndefinedType<never> // never
 * type R = UndefinedType<unknown> // never
 * type R = UndefinedType<string | boolean> // never
 * ```
 */
export type UndefinedType<T, Then = T, Else = never> = IsAny<
	T,
	{
		$then: Else,
		$else: [T, undefined] extends [undefined, T] ? Then : Else
	}
>

/**
 * Is the type `T` exactly `undefined`.
 *
 * ```ts
 * type R = IsUndefined<undefined> // true
 *
 * type R = IsUndefined<never> // false
 * type R = IsUndefined<unknown> // false
 * type R = IsUndefined<string | boolean> // false
 * ```
 */
export type IsUndefined<T, Then = true, Else = false> = UndefinedType<T, Then, Else>

/**
 * Check if the type `T` is not `undefined`.
 *
 * ```ts
 * type R = NotUndefinedType<undefined> // never
 *
 * type R = NotUndefinedType<never> // never
 * type R = NotUndefinedType<unknown> // unknown
 * type R = NotUndefinedType<string | boolean> // string | boolean
 * ```
 */
export type NotUndefinedType<T, Then = T, Else = never> = UndefinedType<T, Else, Then>

/**
 * Is the type `T` not `undefined`.
 *
 * ```ts
 * type R = IsNotUndefined<undefined> // false
 *
 * type R = IsNotUndefined<never> // true
 * type R = IsNotUndefined<unknown> // true
 * type R = IsNotUndefined<string | boolean> // true
 * ```
 */
export type IsNotUndefined<T, Then = true, Else = false> = UndefinedType<T, Else, Then>

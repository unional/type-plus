import type { IsAnyOrNever } from '../any/any_or_never.js'

/**
 * Check if the type `T` is `boolean`, including `true` and `false`.
 *
 * ```ts
 * import type { BooleanType } from 'type-plus'
 *
 * type R = BooleanType<boolean> // boolean
 * type R = BooleanType<true> // true
 * type R = BooleanType<false> // false
 *
 * type R = BooleanType<number> // never
 * type R = BooleanType<unknown> // never
 * ```
 */
export type BooleanType<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	Else,
	[T] extends [boolean] ? Then : Else
>

export type NotBooleanType<T, Then = T, Else = never> = BooleanType<T, Else, Then>

export type IsBoolean<T, Then = true, Else = false> = BooleanType<T, Then, Else>

export type IsNotBoolean<T, Then = true, Else = false> = BooleanType<T, Else, Then>

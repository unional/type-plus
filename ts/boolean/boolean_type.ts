import type { IsAnyOrNever } from '../any/any_or_never.js'

/**
 * Check if the type `T` is exactly `false`.
 *
 * ```ts
 * import type { FalseType } from 'type-plus'
 *
 * type R = FalseType<false> // false
 *
 * type R = FalseType<true> // never
 * type R = FalseType<unknown> // never
 * ```
 */
export type FalseType<T, Then = T, Else = never> = IsAnyOrNever<T, Else, [T] extends [false] ? Then : Else>

/**
 * Check if the type `T` is not exactly `false`.
 *
 * ```ts
 * import type { NotFalseType } from 'type-plus'
 *
 * type R = NotFalseType<false> // never
 *
 * type R = NotFalseType<true> // true
 * type R = NotFalseType<unknown> // unknown
 * ```
 */
export type NotFalseType<T, Then = T, Else = never> = FalseType<T, Else, Then>

/**
 * Is the type `T` exactly `false`.
 *
 * ```ts
 * import type { IsFalse } from 'type-plus'
 *
 * type R = IsFalse<false> // true
 *
 * type R = IsFalse<true> // false
 * type R = IsFalse<unknown> // false
 * ```
 */
export type IsFalse<T, Then = true, Else = false> = FalseType<T, Then, Else>

/**
 * Is the type `T` not exactly `false`.
 *
 * ```ts
 * import type { IsNotFalse } from 'type-plus'
 *
 * type R = IsNotFalse<false> // false
 *
 * type R = IsNotFalse<true> // true
 * type R = IsNotFalse<unknown> // true
 * ```
 */
export type IsNotFalse<T, Then = true, Else = false> = FalseType<T, Else, Then>

/**
 * Check if the type `T` is exactly `true`.
 *
 * ```ts
 * import type { TrueType } from 'type-plus'
 *
 * type R = TrueType<true> // true
 *
 * type R = TrueType<false> // never
 * type R = TrueType<unknown> // never
 * ```
 */
export type TrueType<T, Then = T, Else = never> = IsAnyOrNever<T, Else, [T] extends [true] ? Then : Else>

/**
 * Check if the type `T` is not exactly `true`.
 *
 * ```ts
 * import type { NotTrueType } from 'type-plus'
 *
 * type R = NotTrueType<true> // never
 *
 * type R = NotTrueType<false> // false
 * type R = NotTrueType<unknown> // unknown
 * ```
 */
export type NotTrueType<T, Then = T, Else = never> = TrueType<T, Else, Then>

/**
 * Is the type `T` exactly `true`.
 *
 * ```ts
 * import type { IsTrue } from 'type-plus'
 *
 * type R = IsTrue<true> // true
 *
 * type R = IsTrue<false> // false
 * type R = IsTrue<unknown> // false
 * ```
 */
export type IsTrue<T, Then = true, Else = false> = TrueType<T, Then, Else>

/**
 * Is the type `T` not exactly `true`.
 *
 * ```ts
 * import type { IsNotTrue } from 'type-plus'
 *
 * type R = IsNotTrue<true> // false
 *
 * type R = IsNotTrue<false> // true
 * type R = IsNotTrue<unknown> // true
 * ```
 */
export type IsNotTrue<T, Then = true, Else = false> = TrueType<T, Else, Then>

/**
 * Check if the type `T` is exactly `boolean`.
 *
 * ```ts
 * import type { BooleanType } from 'type-plus'
 *
 * type R = BooleanType<boolean> // true
 *
 * type R = BooleanType<true> // never
 * type R = BooleanType<false> // never
 * type R = BooleanType<unknown> // never
 * ```
 */
export type BooleanType<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	Else,
	[T, boolean] extends [boolean, T] ? Then : Else
>

/**
 * Check if the type `T` is not exactly `false`.
 *
 * ```ts
 * import type { NotBooleanType } from 'type-plus'
 *
 * type R = NotBooleanType<boolean> // never
 *
 * type R = NotBooleanType<true> // true
 * type R = NotBooleanType<false> // false
 * type R = NotBooleanType<unknown> // unknown
 * ```
 */
export type NotBooleanType<T, Then = T, Else = never> = BooleanType<T, Else, Then>

/**
 * Is the type `T` exactly `false`.
 *
 * ```ts
 * import type { IsBoolean } from 'type-plus'
 *
 * type R = IsBoolean<boolean> // true
 *
 * type R = IsBoolean<true> // false
 * type R = IsBoolean<false> // true
 * type R = IsBoolean<unknown> // false
 * ```
 */
export type IsBoolean<T, Then = true, Else = false> = BooleanType<T, Then, Else>

/**
 * Is the type `T` not exactly `false`.
 *
 * ```ts
 * import type { IsNotBoolean } from 'type-plus'
 *
 * type R = IsNotBoolean<boolean> // false
 *
 * type R = IsNotBoolean<true> // true
 * type R = IsNotBoolean<false> // false
 * type R = IsNotBoolean<unknown> // true
 * ```
 */
export type IsNotBoolean<T, Then = true, Else = false> = BooleanType<T, Else, Then>

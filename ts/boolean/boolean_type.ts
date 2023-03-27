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
export type FalseType<T, Then = T, Else = never> = IsAnyOrNever<T, Else, [T, false] extends [false, T] ? Then : Else>

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
export type TrueType<T, Then = T, Else = never> = IsAnyOrNever<T, Else, [T, true] extends [true, T] ? Then : Else>

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

/**
 * Check if the type `T` is exactly `boolean`.
 *
 * ```ts
 * import type { StrictBooleanType } from 'type-plus'
 *
 * type R = StrictBooleanType<boolean> // true
 *
 * type R = StrictBooleanType<true> // never
 * type R = StrictBooleanType<false> // never
 * type R = StrictBooleanType<unknown> // never
 * ```
 */
export type StrictBooleanType<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	Else,
	[T, boolean] extends [boolean, T] ? Then : Else
>

/**
 * Check if the type `T` is not exactly `boolean`.
 *
 * ```ts
 * import type { NotStrictBooleanType } from 'type-plus'
 *
 * type R = NotStrictBooleanType<boolean> // never
 *
 * type R = NotStrictBooleanType<true> // true
 * type R = NotStrictBooleanType<false> // false
 * type R = NotStrictBooleanType<unknown> // unknown
 * ```
 */
export type NotStrictBooleanType<T, Then = T, Else = never> = StrictBooleanType<T, Else, Then>

/**
 * Is the type `T` exactly `boolean`.
 *
 * ```ts
 * import type { IsStrictBoolean } from 'type-plus'
 *
 * type R = IsStrictBoolean<boolean> // true
 *
 * type R = IsStrictBoolean<true> // false
 * type R = IsStrictBoolean<false> // true
 * type R = IsStrictBoolean<unknown> // false
 * ```
 */
export type IsStrictBoolean<T, Then = true, Else = false> = StrictBooleanType<T, Then, Else>

/**
 * Is the type `T` not exactly `false`.
 *
 * ```ts
 * import type { IsNotStrictBoolean } from 'type-plus'
 *
 * type R = IsNotStrictBoolean<boolean> // false
 *
 * type R = IsNotStrictBoolean<true> // true
 * type R = IsNotStrictBoolean<false> // false
 * type R = IsNotStrictBoolean<unknown> // true
 * ```
 */
export type IsNotStrictBoolean<T, Then = true, Else = false> = StrictBooleanType<T, Else, Then>

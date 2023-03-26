import type { IsAny } from '../any/any_type.js'

/**
 * Check if the type `T` is exactly `bigint`.
 *
 * ```
 * import type { BigintType } from 'type-plus'
 *
 * type R = BigintType<bigint> // bigint
 *
 * type R = BigintType<1n> // never
 * type R = BigintType<number> // never
 * type R = BigintType<bigint | boolean> // never
 * type R = BigintType<unknown> // never
 * ```
 */
export type BigintType<T, Then = T, Else = never> = IsAny<T, Else, [T, bigint] extends [bigint, T] ? Then : Else>

/**
 * Is the type `T` exactly `bigint`.
 *
 * ```
 * import type { IsBigint } from 'type-plus'
 *
 * type R = IsBigint<bigint> // true
 *
 * type R = IsBigint<1n> // false
 * type R = IsBigint<number> // false
 * type R = IsBigint<bigint | boolean> // false
 * type R = IsBigint<unknown> // false
 * ```
 */
export type IsBigint<T, Then = true, Else = false> = BigintType<T, Then, Else>

/**
 * Check if the type `T` is not exactly `null`.
 *
 * ```
 * import type { NotBigintType } from 'type-plus'
 *
 * type R = NotBigintType<bigint> // never
 *
 * type R = NotBigintType<1n> // 1n
 * type R = NotBigintType<number> // number
 * type R = NotBigintType<bigint | boolean> // string | boolean
 * type R = NotBigintType<unknown> // unknown
 * ```
 */
export type NotBigintType<T, Then = T, Else = never> = BigintType<T, Else, Then>

/**
 * Is the type `T` not exactly `null`.
 *
 * ```
 * import type { IsNotBigint } from 'type-plus'
 *
 * type R = IsNotBigint<bigint> // false
 *
 * type R = IsNotBigint<1n> // true
 * type R = IsNotBigint<number> // true
 * type R = IsNotBigint<bigint | boolean> // true
 * type R = IsNotBigint<unknown> // true
 * ```
 */
export type IsNotBigint<T, Then = true, Else = false> = BigintType<T, Else, Then>

import type { BigintType } from './bigint_type.js'

/**
 * Is the type `T` exactly `bigint`.
 *
 * ```ts
 * type R = IsBigint<bigint> // true
 *
 * type R = IsBigint<1n> // false
 * type R = IsBigint<number> // false
 * type R = IsBigint<bigint | boolean> // false
 * type R = IsBigint<unknown> // false
 * ```
 */
export type IsBigint<T, Then = true, Else = false> = BigintType<T, Then, Else>

import type { BigintType } from './bigint_type.js'

/**
 * Is the type `T` not exactly `null`.
 *
 * ```ts
 * type R = IsNotBigint<bigint> // false
 *
 * type R = IsNotBigint<1n> // true
 * type R = IsNotBigint<number> // true
 * type R = IsNotBigint<bigint | boolean> // true
 * type R = IsNotBigint<unknown> // true
 * ```
 */
export type IsNotBigint<T, Then = true, Else = false> = BigintType<T, Else, Then>

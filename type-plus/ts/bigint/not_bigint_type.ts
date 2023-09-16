import type { BigintType } from './bigint_type.js'

/**
 * Check if the type `T` is not exactly `null`.
 *
 * ```ts
 * type R = NotBigintType<bigint> // never
 *
 * type R = NotBigintType<1n> // 1n
 * type R = NotBigintType<number> // number
 * type R = NotBigintType<bigint | boolean> // string | boolean
 * type R = NotBigintType<unknown> // unknown
 * ```
 */
export type NotBigintType<T, Then = T, Else = never> = BigintType<T, Else, Then>

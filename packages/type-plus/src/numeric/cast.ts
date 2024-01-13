import type { StringToBigint } from '../bigint/cast.js'
import type { StringToNumber } from '../number/cast.js'

/**
 * Cast a string to a numeric literal type (number or bigint) if possible.
 *
 * ```ts
 * StringToNumeric<'1'> // 1
 * StringToNumeric<'1n'> // 1n
 * StringToNumeric<'-1'> // -1
 * StringToNumeric<'-1n'> // -1n
 * ```
 */
export type StringToNumeric<S extends string, Fail = never> = StringToBigint<S, StringToNumber<S, Fail>>

/**
 * Cast a numeric literal type (number or bigint) to string.
 *
 * ```ts
 * NumericToString<1> // '1'
 * NumericToString<1.23> // '1.23'
 * NumericToString<0.00123> // '0.00123'
 * NumericToString<1n> // '1n'
 * NumericToString<-1> // '-1'
 * NumericToString<-1n> // '-1n'
 * ```
 */
export type NumericToString<N extends number | bigint> = N extends number ? `${N}` : `${N}n`

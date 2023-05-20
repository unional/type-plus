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

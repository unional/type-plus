import type { CastToBigint } from '../bigint/cast.js'
import type { CastToNumber } from '../number/cast.js'

/**
 * Cast a string to a numeric literal type (number or bigint) if possible.
 *
 * ```ts
 * CastToNumeric<'1'> // 1
 * CastToNumeric<'1n'> // 1n
 * CastToNumeric<'-1'> // -1
 * CastToNumeric<'-1n'> // -1n
 * ```
 */
export type CastToNumeric<S extends string, Fail = never> = CastToBigint<S, CastToNumber<S, Fail>>

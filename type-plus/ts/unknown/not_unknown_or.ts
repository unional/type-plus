import { type UnknownType } from './unknown_type.js'

/**
 * 🌪️ *filter*
 *
 * Returns `T` if `T` is not `unknown`, otherwise `Else`.
 *
 * @example
 * ```ts
 * type R = NotUnknownOr<number, string> // number
 * type R = NotUnknownOr<unknown, number> // number
 * ```
 */
export type NotUnknownOr<T, Else> = UnknownType<T, Else, T>

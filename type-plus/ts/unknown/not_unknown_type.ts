import { type UnknownType } from './unknown_type.js'

/**
 * Check if the type `T` is not `unknown`.
 *
 * ```ts
 * type R = NotUnknownType<unknown> // never
 *
 * type R = NotUnknownType<never> // never
 * type R = NotUnknownType<number> // number
 * type R = NotUnknownType<string | boolean> // string | boolean
 * ```
 */

export type NotUnknownType<T, Then = T, Else = never> = UnknownType<T, Else, Then>

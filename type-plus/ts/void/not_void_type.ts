import { type VoidType } from './void_type.js'

/**
 * Check if `T` is not `void`.
 *
 * ```ts
 * type R = VoidType<void> // never
 *
 * type R = VoidType<1> // 1
 * ```
 */

export type NotVoidType<T, Then = T, Else = never> = VoidType<T, Else, Then>

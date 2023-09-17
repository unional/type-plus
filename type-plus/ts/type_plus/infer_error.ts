import type { $Type } from './type.js'

/**
 * 🧰 *type util*
 *
 * An error for unexpected failure of infer type.
 *
 * In your type,
 * you can use `T extends infer U extends V` to specify the type of the inferred type `U`.
 *
 * But doing so means you have to do an extra conditional type.
 *
 * This type can be use in the else case to indicate unexpected failure to infer the type.
 *
 * ```ts
 * type F<T> = T extends infer U extends V
 *   ? ...your type logic...
 *   : InferError<'some message', T>
 * ```
 */
export type $InferError<M extends string, T = unknown> = M extends any ? $Type<'error', `Unable to infer: ${M}`, T> : never

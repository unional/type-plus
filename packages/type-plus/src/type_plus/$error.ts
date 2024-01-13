import type { $Type } from './$type.js'

/**
 * 🧰 *type util*
 *
 * A basic type-level error.
 */
export type $Error<M extends string, T = unknown> = M extends any ? $Type<'error', M, T> : never

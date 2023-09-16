import type { Is_Never, NeverType } from './never_type.js'

/**
 * Check if `T` is not `never`.
 * If it is not, returns `Is_Never`.
 *
 * ```ts
 * type R = NotNeverType<1> // 1
 *
 * type R = NotNeverType<never> // 'is_never'
 * ```
 */

export type NotNeverType<T, Then = T, Else = Is_Never> = NeverType<T, Else, Then>

import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { IsUndefined } from '../undefined/undefined_type.js'

/**
 * Check if `T` is `void`.
 *
 * ```ts
 * type R = VoidType<void> // void
 *
 * type R = VoidType<1> // never
 * ```
 */
export type VoidType<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	Else,
	IsUndefined<T, Else, [T] extends [void] ? Then : Else>
>

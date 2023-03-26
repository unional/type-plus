import type { IsAnyOrNever } from '../any/any_or_never.js'
import type { IsUndefined } from '../undefined/undefined_type.js'

/**
 * Check if `T` is `void`.
 *
 * ```ts
 * import type { VoidType } from 'type-plus'
 *
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

/**
 * Check if `T` is not `void`.
 *
 * ```ts
 * import type { VoidType } from 'type-plus'
 *
 * type R = VoidType<void> // never
 *
 * type R = VoidType<1> // 1
 * ```
 */
export type NotVoidType<T, Then = T, Else = never> = VoidType<T, Else, Then>

/**
 * Is `T` `void`.
 *
 * ```ts
 * import type { IsVoid } from 'type-plus'
 *
 * type R = IsVoid<void> // true
 *
 * type R = IsVoid<1> // false
 * ```
 */
export type IsVoid<T, Then = true, Else = false> = VoidType<T, Then, Else>

/**
 * Is `T` not `void`.
 *
 * ```ts
 * import type { IsNotVoid } from 'type-plus'
 *
 * type R = IsNotVoid<void> // false
 *
 * type R = IsNotVoid<1> // true
 * ```
 */
export type IsNotVoid<T, Then = true, Else = false> = VoidType<T, Else, Then>

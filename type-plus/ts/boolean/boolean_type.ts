import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Check if the type `T` is `boolean`, including `true` and `false`.
 *
 * ```ts
 * type R = BooleanType<boolean> // boolean
 * type R = BooleanType<true> // true
 * type R = BooleanType<false> // false
 *
 * type R = BooleanType<number> // never
 * type R = BooleanType<unknown> // never
 * ```
 */
export type BooleanType<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	$SelectionBranch> extends infer R
	? R extends $Then ? Else
	: R extends $Else ? [T] extends [boolean] ? Then : Else
	: never : never

/**
 * Check if the type `T` is not `boolean`, including `true` and `false`.
 *
 * ```ts
 * type R = NotBooleanType<boolean> // never
 * type R = NotBooleanType<true> // never
 * type R = NotBooleanType<false> // never
 *
 * type R = NotBooleanType<number> // number
 * type R = NotBooleanType<unknown> // unknown
 * ```
 */
export type NotBooleanType<T, Then = T, Else = never> = BooleanType<T, Else, Then>

/**
 * Is the type `T` `boolean`, including `true` and `false`.
 *
 * ```ts
 * type R = IsBoolean<boolean> // true
 * type R = IsBoolean<true> // true
 * type R = IsBoolean<false> // true
 *
 * type R = IsBoolean<number> // false
 * type R = IsBoolean<unknown> // false
 * ```
 */
export type IsBoolean<T, Then = true, Else = false> = BooleanType<T, Then, Else>

/**
 * Is the type `T` not `boolean`, including `true` and `false`.
 *
 * ```ts
 * type R = IsNotBoolean<boolean> // false
 * type R = IsNotBoolean<true> // false
 * type R = IsNotBoolean<false> // false
 *
 * type R = IsNotBoolean<number> // true
 * type R = IsNotBoolean<unknown> // true
 * ```
 */
export type IsNotBoolean<T, Then = true, Else = false> = BooleanType<T, Else, Then>
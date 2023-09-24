import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Check if the type `T` is exactly `true`.
 *
 * ```ts
 * type R = TrueType<true> // true
 *
 * type R = TrueType<false> // never
 * type R = TrueType<unknown> // never
 * ```
 */
export type TrueType<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	$SelectionBranch> extends infer R
	? R extends $Then ? Else
	: R extends $Else ? [T, true] extends [true, T] ? Then : Else
	: never : never

/**
 * Check if the type `T` is not exactly `true`.
 *
 * ```ts
 * type R = NotTrueType<true> // never
 *
 * type R = NotTrueType<false> // false
 * type R = NotTrueType<unknown> // unknown
 * ```
 */
export type NotTrueType<T, Then = T, Else = never> = TrueType<T, Else, Then>

/**
 * Is the type `T` exactly `true`.
 *
 * ```ts
 * type R = IsTrue<true> // true
 *
 * type R = IsTrue<false> // false
 * type R = IsTrue<unknown> // false
 * ```
 */
export type IsTrue<T, Then = true, Else = false> = TrueType<T, Then, Else>

/**
 * Is the type `T` not exactly `true`.
 *
 * ```ts
 * type R = IsNotTrue<true> // false
 *
 * type R = IsNotTrue<false> // true
 * type R = IsNotTrue<unknown> // true
 * ```
 */
export type IsNotTrue<T, Then = true, Else = false> = TrueType<T, Else, Then>

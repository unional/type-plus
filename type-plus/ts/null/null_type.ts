import type { IsAny } from '../any/is_any.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Check if the type `T` is exactly `null`.
 *
 * ```ts
 * type R = NullType<null> // null
 *
 * type R = NullType<never> // never
 * type R = NullType<unknown> // never
 * type R = NullType<string | boolean> // never
 * ```
 */
export type NullType<T, Then = T, Else = never> = IsAny<
	T,
	$SelectionBranch> extends infer R
	? R extends $Then ? Else
	: R extends $Else ? [T, null] extends [null, T] ? Then : Else
	: never : never

/**
 * Check if the type `T` is not exactly `null`.
 *
 * ```ts
 * type R = NotNullType<null> // never
 *
 * type R = NotNullType<never> // never
 * type R = NotNullType<unknown> // unknown
 * type R = NotNullType<string | boolean> // string | boolean
 * ```
 */
export type NotNullType<T, Then = T, Else = never> = NullType<T, Else, Then>



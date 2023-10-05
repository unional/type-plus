import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Check if `T` is an `object`.
 *
 * ```ts
 * type R = ObjectType<{}> // {}
 * type R = ObjectType<{ a: 1 }> // { a: 1 }
 * type R = ObjectType<Function> // Function
 *
 * type R = ObjectType<number> // never
 * ```
 */
export type ObjectType<T, Then = T, Else = never> = IsAnyOrNever<T, $SelectionBranch> extends infer R
	? R extends $Then ? Else
	: R extends $Else ? [T] extends [object] ? Then : Else
	: never : never

/**
 * Check if `T` is not an `object`.
 *
 * ```ts
 * type R = NotObjectType<{}> // never
 * type R = NotObjectType<{ a: 1 }> // never
 * type R = NotObjectType<Function> // never
 *
 * type R = NotObjectType<number> // number
 * ```
 */
export type NotObjectType<T, Then = T, Else = never> = ObjectType<T, Else, Then>

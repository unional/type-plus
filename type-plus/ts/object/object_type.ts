import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'

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
export type ObjectType<T, Then = T, Else = never> = IsAnyOrNever<T, Else, [T] extends [object] ? Then : Else>

/**
 * Is `T` an `object`.
 *
 * Note that `Function`, `Array`, and *tuple* are also `object`.
 *
 * ```ts
 * type R = IsObject<{}> // true
 * type R = IsObject<{ a: 1 }> // true
 * type R = IsObject<Function> // true
 *
 * type R = IsObject<number> // false
 * ```
 */
export type IsObject<T, Then = true, Else = false> = ObjectType<T, Then, Else>

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

/**
 * Is `T` not an `object`.
 *
 * Note that `Function` is also an `object`.
 *
 * ```ts
 * type R = IsNotObject<{}> // false
 * type R = IsNotObject<{ a: 1 }> // false
 * type R = IsNotObject<Function> // false
 *
 * type R = IsNotObject<number> // true
 * ```
 */
export type IsNotObject<T, Then = true, Else = false> = ObjectType<T, Else, Then>

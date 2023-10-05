import type { ObjectType } from './object_type.js'

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

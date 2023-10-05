import type { ObjectType } from './object_type.js'

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

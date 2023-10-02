import { Positive } from './positive.js'

/**
 * Is `T` not a positive numeric type.
 *
 * ```ts
 * type R = IsNotPositive<-1> // true
 *
 * type R = IsNotPositive<0> // false
 * type R = IsNotPositive<1> // false
 * ```
 */

export type IsNotPositive<T, Then = true, Else = false> = Positive<T, Else, Then>

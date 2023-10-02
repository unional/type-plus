import { NotNegative } from './negative.js'

/**
 * Is 'T' not a negative numeric type.
 *
 * ```ts
 * type R = IsNotNegative<-1> // false
 * type R = IsNotNegative<-1n> // false
 *
 * type R = IsNotNegative<number> // boolean
 * type R = IsNotNegative<any> // boolean
 *
 * type R = IsNotNegative<0> // true
 * type R = IsNotNegative<1> // true
 * ```
 */

export type IsNotNegative<T, Then = true, Else = false> = NotNegative<T, Then, Else>

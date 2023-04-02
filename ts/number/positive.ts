import { IsAny } from '../any/any_type.js'
import { IsNever } from '../index.js'

/**
 * Check if `T` is a positive numeric type.
 *
 * ```ts
 * import type { Positive } from 'type-plus'
 *
 * type R = Positive<1> // 1
 * type R = Positive<0> // 0
 * type R = Positive<1n> // 1n
 *
 * type R = Positive<-1> // never
 * ```
 */
export type Positive<T, Then = T, Else = never> = IsAny<
	T,
	Then | Else,
	IsNever<T, Else, T extends number | bigint ? (`${T}` extends `-${string}` ? Else : Then) : Else>
>

/**
 * Is `T` a positive numeric type.
 *
 * ```ts
 * import type { IsPositive } from 'type-plus'
 *
 * type R = IsPositive<1> // true
 * type R = IsPositive<0> // true
 * type R = IsPositive<1n> // true
 *
 * type R = IsPositive<number> // boolean
 * type R = IsPositive<bigint> // boolean
 * type R = IsPosistive<any> // boolean
 *
 * type R = IsPositive<-1> // false
 * ```
 */
export type IsPositive<T, Then = true, Else = false> = Positive<T, Then, Else>

/**
 * Check if `T` is not a positive numeric type.
 *
 * ```ts
 * import type { NonPositive } from 'type-plus'
 *
 * type R = NonPositive<-1> // -1
 *
 * type R = NonPositive<0> // never
 * type R = NonPositive<1> // never
 * ```
 */
export type NonPositive<T, Then = T, Else = never> = Positive<T, Else, Then>

/**
 * Is `T` not a positive numeric type.
 *
 * ```ts
 * import type { IsNotPositive } from 'type-plus'
 *
 * type R = IsNotPositive<-1> // true
 *
 * type R = IsNotPositive<0> // false
 * type R = IsNotPositive<1> // false
 * ```
 */
export type IsNotPositive<T, Then = true, Else = false> = Positive<T, Else, Then>

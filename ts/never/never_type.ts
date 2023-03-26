import type { Brand } from '../nominal/brand.js'


/**
 * This is a unique type used in the `Else` branch of `NeverType`.
 */
export type Not_Never = Brand<'not_never', symbol>

/**
 * This is a unique type used in the `Else` branch of `NotNeverType`.
 */
export type Is_Never = Brand<'is_never', symbol>

/**
 * Check if `T` is `never`.
 * If it is not, returns `Not_Never`.
 *
 * ```
 * import type { NeverType } from 'type-plus'
 *
 * type R = NeverType<never> // never
 *
 * type R = NeverType<1> // 'not never'
 * ```
 */
export type NeverType<T, Then = T, Else = Not_Never> = [T] extends [never] ? Then : Else

/**
 * Check if `T` is not `never`.
 * If it is not, returns `Is_Never`.
 *
 * ```
 * import type { NeverType } from 'type-plus'
 *
 * type R = NeverType<1> // 1
 *
 * type R = NeverType<never> // never
 * ```
 */
export type NotNeverType<T, Then = T, Else = Is_Never> = [T] extends [never] ? Else : Then

/**
 * Is `T` `never`.
 *
 * ```
 * import type { IsNever } from 'type-plus'
 *
 * type R = IsNever<never> // true
 *
 * type R = IsNever<1> // false
 * ```
 */
export type IsNever<T, Then = true, Else = false> = [T] extends [never] ? Then : Else

/**
 * Is `T` not `never`.
 *
 * ```
 * import type { IsNotNever } from 'type-plus'
 *
 * type R = IsNotNever<1> // true
 *
 * type R = IsNotNever<never> // false
 */
export type IsNotNever<T, Then = true, Else = false> = [T] extends [never] ? Else : Then

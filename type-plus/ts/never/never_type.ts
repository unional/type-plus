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
 * ```ts
 * type R = NeverType<never> // never
 *
 * type R = NeverType<1> // 'not never'
 * ```
 */
export type NeverType<T, Then = T, Else = Not_Never> = [T, never] extends [never, T] ? Then : Else

/**
 * Check if `T` is not `never`.
 * If it is not, returns `Is_Never`.
 *
 * ```ts
 * type R = NotNeverType<1> // 1
 *
 * type R = NotNeverType<never> // 'is_never'
 * ```
 */
export type NotNeverType<T, Then = T, Else = Is_Never> = NeverType<T, Else, Then>

/**
 * Is `T` `never`.
 *
 * ```ts
 * type R = IsNever<never> // true
 *
 * type R = IsNever<1> // false
 * ```
 */
export type IsNever<T, Then = true, Else = false> = NeverType<T, Then, Else>

/**
 * Is `T` not `never`.
 *
 * ```ts
 * type R = IsNotNever<1> // true
 *
 * type R = IsNotNever<never> // false
 */
export type IsNotNever<T, Then = true, Else = false> = NeverType<T, Else, Then>

export namespace NeverType {
	/**
	 * Type options when input type is `never`.
	 */
	export interface Options {
		caseNever?: unknown
	}

	export interface DefaultOptions {
		caseNever: never
	}
}

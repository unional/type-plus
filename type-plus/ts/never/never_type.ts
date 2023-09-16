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

export namespace NeverType {
	/**
	 * Type options when input type is `never`.
	 */
	export interface Options {
		$never?: unknown
	}

	export interface DefaultOptions {
		$never: never
	}
}

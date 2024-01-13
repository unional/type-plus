import type { $Type } from '../$type.js'

/**
 * 🧰 *type util*
 *
 * A utility type to override the behavior of a branch.
 *
 * ```ts
 * type R = IsString<any, { $any: DoThisInstead }> // DoThisInstead
 * type R = IsString<any, { $any: $Override<DoThisInstead> }> // use DoThisInstead as the sole branch logic
 * ```
 */
export type $Override<T> = $Type<'override', 'override', T>

export namespace $Override {
	/**
	 * 🧰 *type util*
	 *
	 * A utility type to unwrap an override.
	 */
	export type $Unwrap<T> = T extends $Override<infer U> ? U : T
}

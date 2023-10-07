import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'

/**
 * Is the type `T` `string` or string literals.
 *
 * ```ts
 * type R = IsString<string> // true
 * type R = IsString<''> // true
 * type R = IsString<'a'> // true
 *
 * type R = IsString<string | boolean> // false
 * type R = IsString<never> // false
 * type R = IsString<unknown> // false
 * ```
 */
export type IsString<T, $O extends IsString.$Options = {}> = SelectWithDistribute<T, string, $O>

export namespace IsString {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}

import type { $Select } from '../type_plus/branch/$select.js'

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
export type IsString<T, $O extends IsString.$Options = {}> = $Select<T, string, $O>

export namespace IsString {
	export type $Options = $Select.$Options
	export type $Default = $Select.$Default
	export type $Branch = $Select.$Branch
}

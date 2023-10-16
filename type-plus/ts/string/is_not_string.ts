import type { $SelectInvert } from '../type_plus/branch/$select_invert.js'

/**
 * Is the type `T` not `string` nor string literals.
 *
 * ```ts
 * type R = IsNotString<string> // false
 * type R = IsNotString<''> // false
 * type R = IsNotString<'a'> // false
 *
 * type R = IsNotString<string | boolean> // true
 * type R = IsNotString<never> // true
 * type R = IsNotString<unknown> // true
 * ```
 */

export type IsNotString<T, $O extends IsNotString.$Options = {}> = $SelectInvert<T, string, $O>

export namespace IsNotString {
	export type $Options = $SelectInvert.$Options
	export type $Default = $SelectInvert.$Default
	export type $Branch = $SelectInvert.$Branch
}

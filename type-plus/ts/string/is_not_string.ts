import type { SelectInvertWithDistribute } from '../type_plus/branch/select_invert_with_distribute.js'

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

export type IsNotString<T, $O extends IsNotString.$Options = {}> = SelectInvertWithDistribute<T, string, $O>

export namespace IsNotString {
	export type $Options = SelectInvertWithDistribute.$Options
	export type $Default = SelectInvertWithDistribute.$Default
	export type $Branch = SelectInvertWithDistribute.$Branch
}

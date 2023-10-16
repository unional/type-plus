import type { $SelectInvert } from '../type_plus/branch/$select_invert.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `boolean`.
 *
 * @example
 * ```ts
 * type R = IsNotBoolean<boolean> // false
 * type R = IsNotBoolean<true> // false
 * type R = IsNotBoolean<false> // false
 *
 * type R = IsNotBoolean<number> // true
 * type R = IsNotBoolean<unknown> // true
 * type R = IsNotBoolean<string | boolean> // boolean
  * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `boolean`, including `true` and `false`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotBoolean<boolean, { selection: 'filter' }> // never
 * type R = IsNotBoolean<true, { selection: 'filter' }> // never
 * type R = IsNotBoolean<false, { selection: 'filter' }> // never
 *
 * type R = IsNotBoolean<number, { selection: 'filter' }> // number
 * type R = IsNotBoolean<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotBoolean<never, { selection: 'filter' }> // never
 * type R = IsNotBoolean<string | boolean, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotBoolean<boolean | 1> // boolean
 * type R = IsNotBoolean<boolean | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotBoolean<boolean, $SelectionBranch> // $Else
 * type R = IsNotBoolean<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotBoolean<T, $O extends IsNotBoolean.$Options = {}> = $SelectInvert<T, boolean, $O>

export namespace IsNotBoolean {
	export type $Options = $SelectInvert.$Options
	export type $Default = $SelectInvert.$Default
	export type $Branch = $SelectInvert.$Branch
}

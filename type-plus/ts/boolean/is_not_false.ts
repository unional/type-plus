import type { $SelectInvert } from '../type_plus/branch/$select_invert.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `false`.
 *
 * @example
 * ```ts
 * type R = IsNotFalse<boolean> // boolean
 * type R = IsNotFalse<true> // true
 * type R = IsNotFalse<false> // false
 *
 * type R = IsNotFalse<number> // true
 * type R = IsNotFalse<unknown> // true
 * type R = IsNotFalse<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `false`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotFalse<boolean, { selection: 'filter' }> // true
 * type R = IsNotFalse<true, { selection: 'filter' }> // true
 * type R = IsNotFalse<false, { selection: 'filter' }> // never
 *
 * type R = IsNotFalse<number, { selection: 'filter' }> // number
 * type R = IsNotFalse<never, { selection: 'filter' }> // never
 * type R = IsNotFalse<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotFalse<string | boolean, { selection: 'filter' }> // string | true
 * type R = IsNotFalse<string | false, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotFalse<false | 1> // boolean
 * type R = IsNotFalse<boolean | 1> // boolean
 * type R = IsNotFalse<boolean | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotFalse<false, $SelectionBranch> // $Else
 * type R = IsNotFalse<boolean, $SelectionBranch> // $Then | $Else
 * type R = IsNotFalse<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotFalse<T, $O extends IsNotFalse.$Options = {}> = $SelectInvert<T, false, $O>

export namespace IsNotFalse {
	export type $Options = $SelectInvert.$Options
	export type $Default = $SelectInvert.$Default
	export type $Branch = $SelectInvert.$Branch
}

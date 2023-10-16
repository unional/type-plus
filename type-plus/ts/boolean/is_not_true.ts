import type { $SelectInvert } from '../type_plus/branch/$select_invert.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `true`.
 *
 * @example
 * ```ts
 * type R = IsNotTrue<boolean> // boolean
 * type R = IsNotTrue<true> // false
 * type R = IsNotTrue<false> // true
 *
 * type R = IsNotTrue<number> // true
 * type R = IsNotTrue<unknown> // true
 * type R = IsNotTrue<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `true`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotTrue<boolean, { selection: 'filter' }> // false
 * type R = IsNotTrue<true, { selection: 'filter' }> // never
 * type R = IsNotTrue<false, { selection: 'filter' }> // false
 *
 * type R = IsNotTrue<number, { selection: 'filter' }> // number
 * type R = IsNotTrue<never, { selection: 'filter' }> // never
 * type R = IsNotTrue<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotTrue<string | boolean, { selection: 'filter' }> // string | false
 * type R = IsNotTrue<string | true, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotTrue<boolean | 1> // boolean
 * type R = IsNotTrue<true | 1> // boolean
 * type R = IsNotTrue<false | 1> // true
 * type R = IsNotTrue<boolean | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotTrue<true, $SelectionBranch> // $Else
 * type R = IsNotTrue<boolean, $SelectionBranch> // $Then | $Else
 * type R = IsNotTrue<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotTrue<T, $O extends IsNotTrue.$Options = {}> = $SelectInvert<T, true, $O>

export namespace IsNotTrue {
	export type $Options = $SelectInvert.$Options
	export type $Default = $SelectInvert.$Default
	export type $Branch = $SelectInvert.$Branch
}

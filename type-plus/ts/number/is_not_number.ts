import type { SelectInvertWithDistribute } from '../type_plus/branch/select_invert_with_distribute.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `number` nor `number` literals.
 *
 * @example
 * ```ts
 * type R = IsNotNumber<number> // false
 * type R = IsNotNumber<1> // false
 *
 * type R = IsNotNumber<never> // true
 * type R = IsNotNumber<unknown> // true
 * type R = IsNotNumber<string | number> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `number` nor `number` literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotNumber<number, { selection: 'filter' }> // never
 * type R = IsNotNumber<1, { selection: 'filter' }> // never
 *
 * type R = IsNotNumber<never, { selection: 'filter' }> // never
 * type R = IsNotNumber<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotNumber<string | 1, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotNumber<number | 1> // boolean
 * type R = IsNotNumber<number | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotNumber<string, $SelectionBranch> // $Then
 * type R = IsNotNumber<number, $SelectionBranch> // $Else
 * ```
 */
export type IsNotNumber<T, $O extends IsNotNumber.$Options = {}> = SelectInvertWithDistribute<T, number, $O>

export namespace IsNotNumber {
	export type $Options = SelectInvertWithDistribute.$Options
	export type $Default = SelectInvertWithDistribute.$Default
	export type $Branch = SelectInvertWithDistribute.$Branch
}

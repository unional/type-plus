import type { SelectInvertWithDistribute } from '../type_plus/branch/select_invert_with_distribute.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `bigint` nor `bigint` literals.
 *
 * @example
 * ```ts
 * type R = IsNotBigint<bigint> // false
 * type R = IsNotBigint<1n> // false
 *
 * type R = IsNotBigint<never> // true
 * type R = IsNotBigint<unknown> // true
 * type R = IsNotBigint<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `bigint` nor `bigint` literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotBigint<bigint, { selection: 'filter' }> // never
 * type R = IsNotBigint<1n, { selection: 'filter' }> // never
 *
 * type R = IsNotBigint<never, { selection: 'filter' }> // never
 * type R = IsNotBigint<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotBigint<string | boolean, { selection: 'filter' }> // string | boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `bigint` nor `bigint` literals, otherwise returns `unknown`.
 *
 * @example
 * ```ts
 * type R = IsNotBigint<bigint, { selection: 'filter-unknown' }> // unknown
 * type R = IsNotBigint<1n, { selection: 'filter-unknown' }> // unknown
 *
 * type R = IsNotBigint<string | boolean, { selection: 'filter-unknown' }> // string | boolean
 * type R = IsNotBigint<string | bigint, { selection: 'filter-unknown' }> // unknown
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotBigint<bigint | 1> // boolean
 * type R = IsNotBigint<bigint | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotBigint<string, $SelectionBranch> // $Then
 * type R = IsNotBigint<bigint, $SelectionBranch> // $Else
 * ```
 */
export type IsNotBigint<T, $O extends IsNotBigint.$Options = {}> = SelectInvertWithDistribute<T, bigint, $O>

export namespace IsNotBigint {
	export type $Options = SelectInvertWithDistribute.$Options
	export type $Default = SelectInvertWithDistribute.$Default
	export type $Branch = SelectInvertWithDistribute.$Branch
}

import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `bigint` or `bigint` literals.
 *
 * @example
 * ```ts
 * type R = isBigint<bigint> // true
 * type R = isBigint<1n> // true
 *
 * type R = isBigint<never> // false
 * type R = isBigint<unknown> // false
 * type R = isBigint<string | boolean> // false
 *
 * type R = isBigint<string | bigint> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `bigint` or `bigint` literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = isBigint<bigint, { selection: 'filter' }> // bigint
 * type R = isBigint<1n, { selection: 'filter' }> // bigint
 *
 * type R = isBigint<never, { selection: 'filter' }> // never
 * type R = isBigint<unknown, { selection: 'filter' }> // never
 * type R = isBigint<string | boolean, { selection: 'filter' }> // never
 *
 * type R = isBigint<string | bigint> // bigint
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = isBigint<bigint | 1> // boolean
 * type R = isBigint<bigint | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = isBigint<bigint, $SelectionBranch> // $Then
 * type R = isBigint<string, $SelectionBranch> // $Else
 * ```
 */
export type IsBigint<T, $O extends IsBigint.$Options = {}> = SelectWithDistribute<T, bigint, $O>

export namespace IsBigint {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}

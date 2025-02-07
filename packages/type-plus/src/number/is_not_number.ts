import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Special } from '../$type/special/$special.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { Equal } from '../equal/equal.js'
import type { NotAssignable } from '../predicates/not_assignable.js'

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
export type IsNotNumber<T, $O extends IsNotNumber.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>
			$else: IsNotNumber.$<T, $O>
		}
	>
>

export namespace IsNotNumber {
	export type $Options = Equal.$Options & $Exact.Options
	export type $Branch<$O extends $Options = {}> = Equal.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not `number` nor `number` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], false]> extends true
		? $Distributive.Parse<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>
		: NotAssignable.$<T, number, $O>
	export type $UtilOptions = NotAssignable.$UtilOptions & $Exact.Options
	export type _D<T, $O extends IsNotNumber.$Options> = T extends number & infer U
		? U extends number
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
	export type _N<T, $O extends IsNotNumber.$Options> = [T] extends [number & infer U]
		? U extends number
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
}

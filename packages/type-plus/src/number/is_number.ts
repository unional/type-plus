import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Special } from '../$type/special/$special.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { $Equal } from '../equal/equal.js'
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `number` or `number` literals.
 *
 * @example
 * ```ts
 * type R = IsNumber<number> // true
 * type R = IsNumber<1> // true
 *
 * type R = IsNumber<never> // false
 * type R = IsNumber<unknown> // false
 * type R = IsNumber<string | boolean> // false
 *
 * type R = IsNumber<string | number> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `number` or `number` literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNumber<number, { selection: 'filter' }> // number
 * type R = IsNumber<1, { selection: 'filter' }> // 1
 *
 * type R = IsNumber<never, { selection: 'filter' }> // never
 * type R = IsNumber<unknown, { selection: 'filter' }> // never
 * type R = IsNumber<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsNumber<string | number> // number
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNumber<number | 1> // boolean
 * type R = IsNumber<number | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNumber<number, $SelectionBranch> // $Then
 * type R = IsNumber<string, $SelectionBranch> // $Else
 * ```
 */
export type IsNumber<T, $O extends IsNumber.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>
			$else: IsNumber.$<T, $O>
		}
	>
>

export namespace IsNumber {
	export type $Options = $Equal.$Options & $Exact.Options
	export type $Branch<$O extends $Options = {}> = $Equal.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `number` or `number` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], false]> extends true
		? $Distributive.Parse<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>
		: Assignable.$<T, number, $O>
	export type $UtilOptions = Assignable.$UtilOptions & $Exact.Options

	export type _D<T, $O extends $UtilOptions> = T extends number & infer U
		? U extends number
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
	export type _N<T, $O extends $UtilOptions> = [T] extends [number & infer U]
		? U extends number
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
}

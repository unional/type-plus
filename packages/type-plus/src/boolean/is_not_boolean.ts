import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Equal } from '../$type/equal/$equal.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Special } from '../$type/special/$special.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { NotAssignable } from '../predicates/not_assignable.js'
import type { IsBoolean } from './is_boolean.js'

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
export type IsNotBoolean<T, $O extends IsNotBoolean.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>
			$else: IsNotBoolean.$<T, $O>
		}
	>
>

export namespace IsNotBoolean {
	export type $Options = $Equal.$Options & $Exact.Options
	export type $Branch<$O extends $Options = {}> = $Equal.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not `boolean` nor `boolean` literals.
	 *r
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], false]> extends true
		? $Distributive.Parse<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>
		: NotAssignable.$<T, boolean, $O>
	export type $UtilOptions = NotAssignable.$UtilOptions & $Exact.Options

	export type _D<T, $O extends $Options> = IsBoolean._DistributeMap<T> extends infer R
		? ['aBcD' | 'AbCd' | 'abcd'] extends [R]
			? $ResolveBranch<Exclude<T, boolean>, $O, [$Then | $Else]>
			: ['aBcD' | 'AbCd'] extends [R]
				? $ResolveBranch<T, $O, [$Else]>
				: ['aBcd' | 'Abcd'] extends [R]
					? $ResolveBranch<T, $O, [$Else]>
					: $ResolveBranch<T, $O, [$Then]>
		: never
	export type _N<T, $O extends $Options> = [T] extends [boolean]
		? [T] extends [true]
			? $ResolveBranch<T, $O, [$Then]>
			: [T] extends [false]
				? $ResolveBranch<T, $O, [$Then]>
				: $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
}

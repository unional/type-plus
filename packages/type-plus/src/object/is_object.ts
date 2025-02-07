import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Equality } from '../$type/equal/$equal.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Special } from '../$type/special/$special.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { IdentityEqual } from '../equal/identity_equal.js'
import type { IsNever } from '../never/is_never.js'
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is an `object` or object literals.
 *
 * Note that `Function`, `Array`, and *tuple* are also objects.
 *
 * @example
 * ```ts
 * type R = IsNotObject<object> // true
 * type R = IsObject<{}> // true
 * type R = IsObject<{ a: 1 }> // true
 * type R = IsObject<Function> // true
 *
 * type R = IsObject<never> // false
 * type R = IsObject<unknown> // false
 * type R = IsObject<number> // false
 *
 * type R = IsObject<{} | bigint> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is an `object` or object literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsObject<{}, { selection: 'filter' }> // {}
 * type R = IsObject<{ a: 1 }, { selection: 'filter' }> // { a: 1 }
 * type R = IsObject<Function, { selection: 'filter' }> // Function
 *
 * type R = IsObject<never, { selection: 'filter' }> // never
 * type R = IsObject<unknown, { selection: 'filter' }> // never
 *
 * type R = IsObject<{} | bigint> // {}
 * ```
 *
 * 🔢 *customize*:
 *
 * Validate if `T` is exactly `object`.
 *
 * @example
 * ```ts
 * type R = IsObject<object, { exact: true }> // true
 * type R = IsObject<{}, { exact: true }> // false
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsObject<{} | 1> // boolean
 * type R = IsObject<{} | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsObject<{}, $SelectionBranch> // $Then
 * type R = IsObject<string, $SelectionBranch> // $Else
 * ```
 */
export type IsObject<T, $O extends IsObject.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Else]>
			$else: IsObject.$<T, $O>
		}
	>
>

export namespace IsObject {
	export type $Options = $Equality.$Options & $Exact.Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `object` or `object` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], $Exact.Default]> extends true
		? $Distributive.Parse<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>
		: Assignable.$<T, object, $O>
	export type $UtilOptions = Assignable.$UtilOptions & $Exact.Options

	export type _D<T, $O extends $UtilOptions> = T extends object
		? IdentityEqual<
				T,
				{},
				$ResolveBranch<T, $O, [$Else]>,
				IsNever<
					keyof T,
					{
						$then: $ResolveBranch<T, $O, [$Then]>
						$else: $ResolveBranch<T, $O, [$Else]>
					}
				>
			>
		: $ResolveBranch<T, $O, [$Else]>

	export type _N<T, $O extends $UtilOptions> = [T] extends [object & infer U]
		? U extends object
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
}

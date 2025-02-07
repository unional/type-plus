import type { $Equality } from '../$type/$equality.js'
import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Special } from '../$type/special/$special.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { IdentityEqual } from '../equal/identity_equal.js'
import type { IsNever } from '../never/is_never.js'
import type { NotAssignable } from '../predicates/not_assignable.js'

/**
 * Is `T` not an `object`.
 *
 * Note that `Function` is also an `object`.
 *
 * ```ts
 * type R = IsNotObject<{}> // false
 * type R = IsNotObject<{ a: 1 }> // false
 * type R = IsNotObject<Function> // false
 *
 * type R = IsNotObject<number> // true
 * ```
 */
/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not an `object` nor object literals.
 *
 * Note that `Function`, `Array`, and *tuple* are also objects.
 *
 * @example
 * ```ts
 * type R = IsNotObject<object> // false
 * type R = IsNotObject<{}> // false
 * type R = IsNotObject<{ a: 1 }> // false
 * type R = IsNotObject<Function> // false
 *
 * type R = IsNotObject<never> // true
 * type R = IsNotObject<unknown> // true
 * type R = IsNotObject<number> // true
 *
 * type R = IsNotObject<{} | bigint> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not an `object` nor object literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotObject<{}, { selection: 'filter' }> // never
 * type R = IsNotObject<{ a: 1 }, { selection: 'filter' }> // never
 * type R = IsNotObject<Function, { selection: 'filter' }> // never
 *
 * type R = IsNotObject<never, { selection: 'filter' }> // never
 * type R = IsNotObject<unknown, { selection: 'filter' }> // unknown
 *
 * type R = IsNotObject<{} | bigint> // bigint
 * ```
 *
 * 🔢 *customize*:
 *
 * Validate if `T` is not exactly `object`.
 *
 * @example
 * ```ts
 * type R = IsNotObject<object, { exact: true }> // false
 * type R = IsNotObject<{}, { exact: true }> // true
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotObject<{} | 1> // boolean
 * type R = IsNotObject<{} | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotObject<{}, $SelectionBranch> // $Else
 * type R = IsNotObject<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotObject<T, $O extends IsNotObject.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>
			$else: IsNotObject.$<T, $O>
		}
	>
>
export namespace IsNotObject {
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
		: NotAssignable.$<T, object, $O>
	export type $UtilOptions = NotAssignable.$UtilOptions & $Exact.Options

	export type _D<T, $O extends $UtilOptions> = T extends object
		? IdentityEqual<
				T,
				{},
				$ResolveBranch<T, $O, [$Then]>,
				IsNever<
					keyof T,
					{
						$then: $ResolveBranch<T, $O, [$Else]>
						$else: $ResolveBranch<T, $O, [$Then]>
					}
				>
			>
		: $ResolveBranch<T, $O, [$Then]>

	export type _N<T, $O extends $UtilOptions> = [T] extends [object & infer U]
		? U extends object
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
}

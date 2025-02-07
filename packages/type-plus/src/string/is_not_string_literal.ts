import type { $Equality } from '../$type/$equality.js'
import type { $ExactDefault, $ExactOptions } from '../$type/$exact.js'
import type { $IsDistributive } from '../$type/$is_distributive.js'
import type { $MergeOptions } from '../$type/$merge_options.js'
import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $SpecialType } from '../$type/$special_type.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { $SelectionOptions } from '../$type/branch/$selection_options.js'
import type { Assignable } from '../predicates/assignable.js'
import type { _StringType } from './_string_type.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not a string literal(s).
 *
 * @example
 * ```ts
 * type R = IsNotStringLiteral<string> // true
 * type R = IsNotStringLiteral<'a'> // false
 * type R = IsNotStringLiteral<`${number}`> // false
 *
 * type R = IsNotStringLiteral<never> // true
 * type R = IsNotStringLiteral<unknown> // true
 * type R = IsNotStringLiteral<'a' | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not a string literal(s), otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotStringLiteral<string, { selection: 'filter' }> // string
 * type R = IsNotStringLiteral<'a', { selection: 'filter' }> // never
 *
 * type R = IsNotStringLiteral<never, { selection: 'filter' }> // never
 * type R = IsNotStringLiteral<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotStringLiteral<'a' | boolean, { selection: 'filter' }> // boolean
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotStringLiteral<'abc' | 1> // boolean
 * type R = IsNotStringLiteral<'abc' | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*:
 *
 * Check if `T` is exactly not a string literal, excluding template literals.
 *
 * ```ts
 * type R = IsNotStringLiteral<'${number}'> // false
 * type R = IsNotStringLiteral<'${number}', { exact: true }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotStringLiteral<'abc', $IsNotStringLiteral.$Branch> // $Else
 * type R = IsNotStringLiteral<string, $IsNotStringLiteral.$Branch> // $Then
 * ```
 */
export type IsNotStringLiteral<T, $O extends IsNotStringLiteral.$Options = {}> = $SpecialType<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<T, $O, [$Then]>
			$else: IsNotStringLiteral.$<T, $O>
		}
	>
>

export namespace IsNotStringLiteral {
	export type $Options = $Equality.$Options & $ExactOptions
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is string literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], $ExactDefault]> extends true
		? $IsDistributive<$O, { $then: _ED<T, $O>; $else: _EN<T, $O> }>
		: $IsDistributive<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>

	export type $UtilOptions = Assignable.$UtilOptions & $ExactOptions

	export type _ED<T, $O extends $SelectionOptions> = T extends string ? _E<T, $O> : $ResolveBranch<T, $O, [$Then]>

	export type _EN<T, $O extends $SelectionOptions> = [T] extends [string] ? _E<T, $O> : $ResolveBranch<T, $O, [$Then]>

	export type _E<T extends string, $O extends $SelectionOptions> = T extends string
		? _StringType<T> extends infer R
			? R extends 'stringLiteral'
				? $ResolveBranch<T, $O, [$Else]>
				: $ResolveBranch<T, $O, [$Then]>
			: never
		: $ResolveBranch<T, $O, [$Then]>

	export type _D<T, $O extends $SelectionOptions> = T extends string & infer U
		? _U<T, U, $O>
		: $ResolveBranch<T, $O, [$Then]>

	export type _N<T, $O extends $SelectionOptions> = [T] extends [string & infer U]
		? _U<T, U, $O>
		: $ResolveBranch<T, $O, [$Then]>

	export type _U<T, U, $O extends $SelectionOptions> = U extends `${any}`
		? $ResolveBranch<T, $O, [$Else]>
		: U extends Uppercase<infer N>
			? _D<N, $O>
			: U extends Lowercase<infer N>
				? _D<N, $O>
				: $ResolveBranch<T, $O, [$Then]>
}

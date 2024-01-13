import type { Assignable } from '../predicates/assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $Exact } from '../type_plus/branch/$exact.js'
import type { $IsDistributive } from '../type_plus/branch/$is_distributive.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'
import type { $ExtractManipulatedString } from './$extract_manipulated_string.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is a string literal(s).
 *
 * @example
 * ```ts
 * type R = IsStringLiteral<string> // false
 * type R = IsStringLiteral<'a'> // true
 * type R = IsStringLiteral<`${number}`> // true
 *
 * type R = IsStringLiteral<never> // false
 * type R = IsStringLiteral<unknown> // false
 * type R = IsStringLiteral<'a' | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is a string literal(s), otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsStringLiteral<string, { selection: 'filter' }> // never
 * type R = IsStringLiteral<'a', { selection: 'filter' }> // 'a'
 *
 * type R = IsStringLiteral<never, { selection: 'filter' }> // never
 * type R = IsStringLiteral<unknown, { selection: 'filter' }> // never
 * type R = IsStringLiteral<'a' | boolean, { selection: 'filter' }> // 'a'
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsStringLiteral<'abc' | 1> // boolean
 * type R = IsStringLiteral<'abc' | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*:
 *
 * Check if `T` is exactly a string literal, excluding template literals.
 *
 * ```ts
 * type R = IsStringLiteral<'${number}'> // true
 * type R = IsStringLiteral<'${number}', { exact: true }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsStringLiteral<'abc', $IsStringLiteral.$Branch> // $Then
 * type R = IsStringLiteral<string, $IsStringLiteral.$Branch> // $Else
 * ```
 */
export type IsStringLiteral<T, $O extends IsStringLiteral.$Options = {}> =
	$SpecialType<T,
		$MergeOptions<$O,
			{
				$then: $ResolveBranch<T, $O, [$Else]>,
				$else: IsStringLiteral.$<T, $O>
			}
		>
	>

export namespace IsStringLiteral {
	export type $Options = $Equality.$Options & $Exact.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is string literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> =
		$ResolveOptions<[$O['exact'], $Exact.$Default]> extends true
		? $IsDistributive<$O, { $then: _ED<T, $O>, $else: _EN<T, $O> }>
		: $IsDistributive<$O, { $then: _D<T, $O>, $else: _N<T, $O> }>

	export type $UtilOptions = Assignable.$UtilOptions & $Exact.$Options

	export type _ED<T, $O extends $SelectionOptions> =
		T extends string ? (_E<T, $O>) : $ResolveBranch<T, $O, [$Else]>

	export type _EN<T, $O extends $SelectionOptions> =
		[T] extends [string] ? (_E<T, $O>) : $ResolveBranch<T, $O, [$Else]>

	export type _E<T extends string, $O extends $SelectionOptions> =
		$ExtractManipulatedString<`${T}`> extends infer K
		? (string extends K
			? $ResolveBranch<T, $O, [$Else]>
			: (K extends string
				? (Uppercase<K> extends Uppercase<Lowercase<K>>
					? (Lowercase<K> extends Lowercase<Uppercase<K>>
						? $ResolveBranch<T, $O, [$Then]>
						: $ResolveBranch<T, $O, [$Else]>)
					: $ResolveBranch<T, $O, [$Else]>)
				: $ResolveBranch<T, $O, [$Else]>)
		)
		: never

	export type _D<T, $O extends $SelectionOptions> =
		T extends string & infer U ? _U<T, U, $O> : $ResolveBranch<T, $O, [$Else]>

	export type _N<T, $O extends $SelectionOptions> =
		[T] extends [string & infer U] ? _U<T, U, $O> : $ResolveBranch<T, $O, [$Else]>

	export type _U<T, U, $O extends $SelectionOptions> =
		U extends `${any}`
		? $ResolveBranch<T, $O, [$Then]>
		: (
			U extends Uppercase<infer N>
			? _D<N, $O>
			: U extends Lowercase<infer N>
			? _D<N, $O>
			: $ResolveBranch<T, $O, [$Else]>
		)

}

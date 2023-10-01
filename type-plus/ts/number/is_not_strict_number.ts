import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not strictly `number`, returns true for number literals or other types.
 *
 * @example
 * ```ts
 * type R = IsNotStrictNumber<number> // false
 * type R = IsNotStrictNumber<1> // true
 *
 * type R = IsNotStrictNumber<never> // true
 * type R = IsNotStrictNumber<unknown> // true
 * type R = IsNotStrictNumber<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not strictly `number`, returns `T` for number literals or other types.
 *
 * @example
 * ```ts
 * type R = IsNotStrictNumber<number, { selection: 'filter' }> // never
 * type R = IsNotStrictNumber<1, { selection: 'filter' }> // 1
 *
 * type R = IsNotStrictNumber<never, { selection: 'filter' }> // never
 * type R = IsNotStrictNumber<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotStrictNumber<string | boolean, { selection: 'filter' }> // string | boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotStrictNumber<number | string> // boolean
 * type R = IsNotStrictNumber<number | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotStrictNumber<string, $SelectionBranch> // $Then
 * type R = IsNotStrictNumber<number, $SelectionBranch> // $Else
 * ```
 */
export type IsNotStrictNumber<
	T,
	$O extends IsNotStrictNumber.$Options = {}
> =
	IsAnyOrNever<T, $SelectionBranch> extends infer R
		? R extends $Then ? $ResolveSelection<$O, T, $Then>
			: R extends $Else ? ($ResolveOptions<[$O['distributive'], SelectWithDistribute.$Default['distributive']]> extends true
				? IsNotStrictNumber._D<T, $O>
				: IsNotStrictNumber._N<T, $O>)
	: never: never

export namespace IsNotStrictNumber {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
	export type _D<T, $O extends IsNotStrictNumber.$Options> = (number extends T
		? (T extends number
			? (`${T}` extends `${bigint}`
				? $ResolveSelection<$O, T, $Then>
				: $ResolveSelection<$O, T, $Else>
			)
			: $ResolveSelection<$O, T, $Then>)
		: $ResolveSelection<$O, T, $Then>)
	export type _N<T, $O extends IsNotStrictNumber.$Options> = ([number, T] extends [T, number]
		? (T extends number
			? (`${T}` extends `${bigint}`
				? $ResolveSelection<$O, T, $Then>
				: $ResolveSelection<$O, T, $Else>)
			: $ResolveSelection<$O, T, $Then>)
		: $ResolveSelection<$O, T, $Then>)
}

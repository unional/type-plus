import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `number`, returns false for number literals or other types.
 *
 * @example
 * ```ts
 * type R = IsStrictNumber<number> // true
 *
 * type R = IsStrictNumber<1> // false
 * type R = IsStrictNumber<never> // false
 * type R = IsStrictNumber<unknown> // false
 * type R = IsStrictNumber<string | boolean> // false
 *
 * type R = IsStrictNumber<string | number> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `number`, returns `never` for number literals or other types.
 *
 * @example
 * ```ts
 * type R = IsStrictNumber<number, { selection: 'filter' }> // number
 *
 * type R = IsStrictNumber<1, { selection: 'filter' }> // never
 * type R = IsStrictNumber<never, { selection: 'filter' }> // never
 * type R = IsStrictNumber<unknown, { selection: 'filter' }> // never
 * type R = IsStrictNumber<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsStrictNumber<string | number> // number
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsStrictNumber<number | string> // boolean
 * type R = IsStrictNumber<number | string, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsStrictNumber<number, $SelectionBranch> // $Then
 * type R = IsStrictNumber<string, $SelectionBranch> // $Else
 * ```
 */
export type IsStrictNumber<
	T,
	$O extends IsStrictNumber.$Options = {}
> =
	IsAnyOrNever<T, $SelectionBranch> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Else>
	: R extends $Else ? ($ResolveOptions<[$O['distributive'], SelectWithDistribute.$Default['distributive']]> extends true
		? IsStrictNumber._D<T, $O>
		: IsStrictNumber._N<T, $O>)
	: never : never

export namespace IsStrictNumber {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
	export type _D<T, $O extends IsStrictNumber.$Options> = (number extends T
		? (T extends number
			? (`${T}` extends `${bigint}`
				? $ResolveSelection<$O, T, $Else>
				: $ResolveSelection<$O, T, $Then>)
			: $ResolveSelection<$O, T, $Else>)
		: $ResolveSelection<$O, T, $Else>)
	export type _N<T, $O extends IsStrictNumber.$Options> = ([number, T] extends [T, number]
		? (T extends number
			? (`${T}` extends `${bigint}`
				? $ResolveSelection<$O, T, $Else>
				: $ResolveSelection<$O, T, $Then>)
			: $ResolveSelection<$O, T, $Else>)
		: $ResolveSelection<$O, T, $Else>)
}

import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $DistributiveDefault, $DistributiveOptions } from '../type_plus/branch/distributive.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $SelectionOptions, $SelectionPredicate, $Then } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'

/**
 * 🎭 *predicate*
 * ㊙️ *internal*
 *
 * Validate if `T` is `U`.
 *
 * @example
 * ```ts
 * type R = TypePredicate<undefined, undefined> // true
 *
 * type R = TypePredicate<never, undefined> // false
 * type R = TypePredicate<unknown, undefined> // false
 * type R = TypePredicate<string | boolean, undefined> // false
 *
 * type R = TypePredicate<string | undefined, undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = TypePredicate<undefined, undefined, { selection: 'filter' }> // undefined
 *
 * type R = TypePredicate<never, undefined, { selection: 'filter' }> // never
 * type R = TypePredicate<unknown, undefined, { selection: 'filter' }> // never
 * type R = TypePredicate<string | boolean, undefined, { selection: 'filter' }> // never
 *
 * type R = TypePredicate<string | undefined, undefined> // undefined
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `unknown`.
 *
 * @example
 * ```ts
 * type R = TypePredicate<undefined, undefined, { selection: 'filter-unknown' }> // undefined
 *
 * type R = TypePredicate<never, undefined, { selection: 'filter-unknown' }> // unknown
 * type R = TypePredicate<unknown, undefined, { selection: 'filter-unknown' }> // unknown
 * type R = TypePredicate<string | boolean, undefined, { selection: 'filter-unknown' }> // unknown
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = TypePredicate<undefined | 1, undefined> // boolean
 * type R = TypePredicate<undefined | 1, undefined, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = TypePredicate<undefined, undefined, $SelectionBranch> // $Then
 * type R = TypePredicate<string, undefined, $SelectionBranch> // $Else
 * ```
 */
export type TypePredicate<
	T,
	U,
	$O extends TypePredicate.$Options = {}
> = IsAnyOrNever<
	T,
	$SelectionBranch
> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Else>
	: R extends $Else ? ($ResolveOptions<[$O['distributive'], TypePredicate.$Default['distributive']]> extends true
		? T extends U ? $ResolveSelection<$O, T, $Then> : $ResolveSelection<$O, T, $Else>
		: [T] extends [U] ? $ResolveSelection<$O, T, $Then> : $ResolveSelection<$O, T, $Else>)
	: never : never

export namespace TypePredicate {
	export type $Options = $SelectionOptions & $DistributiveOptions
	export type $Default = $SelectionPredicate & $DistributiveDefault
	export type $Branch = $SelectionBranch & $DistributiveDefault
}

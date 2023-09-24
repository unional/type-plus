import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $DistributiveDefault, $DistributiveOptions } from '../type_plus/branch/distributive.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $SelectionOptions, $SelectionPredicate, $Then } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `undefined`.
 *
 * @example
 * ```ts
 * type R = IsUndefined<undefined> // true
 *
 * type R = IsUndefined<never> // false
 * type R = IsUndefined<unknown> // false
 * type R = IsUndefined<string | boolean> // false
 *
 * type R = IsUndefined<string | undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `undefined`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsUndefined<undefined, { selection: 'filter' }> // undefined
 *
 * type R = IsUndefined<never, { selection: 'filter' }> // never
 * type R = IsUndefined<unknown, { selection: 'filter' }> // never
 * type R = IsUndefined<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsUndefined<string | undefined> // undefined
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `undefined`, otherwise returns `unknown`.
 *
 * @example
 * ```ts
 * type R = IsUndefined<undefined, { selection: 'filter-unknown' }> // undefined
 *
 * type R = IsUndefined<never, { selection: 'filter-unknown' }> // unknown
 * type R = IsUndefined<unknown, { selection: 'filter-unknown' }> // unknown
 * type R = IsUndefined<string | boolean, { selection: 'filter-unknown' }> // unknown
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsUndefined<undefined | 1> // boolean
 * type R = IsUndefined<undefined | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsUndefined<undefined, $SelectionBranch> // $Then
 * type R = IsUndefined<string, $SelectionBranch> // $Else
 * ```
 */
export type IsUndefined<
	T,
	$O extends IsUndefined.$Options = {}
> = IsAnyOrNever<
	T,
	$SelectionBranch
> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Else>
	: R extends $Else ? ($ResolveOptions<[$O['distributive'], IsUndefined.$Default['distributive']]> extends true
		? T extends undefined ? $ResolveSelection<$O, T, $Then> : $ResolveSelection<$O, T, $Else>
		: [T] extends [undefined] ? $ResolveSelection<$O, T, $Then> : $ResolveSelection<$O, T, $Else>)
	: never : never

export namespace IsUndefined {
	export type $Options = $SelectionOptions & $DistributiveOptions
	export type $Default = $SelectionPredicate & $DistributiveDefault
	export type $Branch = $SelectionBranch & $DistributiveDefault
}

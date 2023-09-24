import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $DistributiveDefault, $DistributiveOptions } from './branch/distributive.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $SelectionOptions, $SelectionPredicate, $Then } from './branch/selection.js'
import type { $ResolveOptions } from './resolve_options.js'

/**
 * 🎭 *predicate*
 * ㊙️ *internal*
 *
 * Validate if `T` is `U`.
 *
 * @example
 * ```ts
 * type R = TypeNotPredicate<undefined, undefined> // true
 *
 * type R = TypeNotPredicate<never, undefined> // false
 * type R = TypeNotPredicate<unknown, undefined> // false
 * type R = TypeNotPredicate<string | boolean, undefined> // false
 *
 * type R = TypeNotPredicate<string | undefined, undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = TypeNotPredicate<undefined, undefined, { selection: 'filter' }> // undefined
 *
 * type R = TypeNotPredicate<never, undefined, { selection: 'filter' }> // never
 * type R = TypeNotPredicate<unknown, undefined, { selection: 'filter' }> // never
 * type R = TypeNotPredicate<string | boolean, undefined, { selection: 'filter' }> // never
 *
 * type R = TypeNotPredicate<string | undefined, undefined> // undefined
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `unknown`.
 *
 * @example
 * ```ts
 * type R = TypeNotPredicate<undefined, undefined, { selection: 'filter-unknown' }> // undefined
 *
 * type R = TypeNotPredicate<never, undefined, { selection: 'filter-unknown' }> // unknown
 * type R = TypeNotPredicate<unknown, undefined, { selection: 'filter-unknown' }> // unknown
 * type R = TypeNotPredicate<string | boolean, undefined, { selection: 'filter-unknown' }> // unknown
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = TypeNotPredicate<undefined | 1, undefined> // boolean
 * type R = TypeNotPredicate<undefined | 1, undefined, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = TypeNotPredicate<undefined, undefined, $SelectionBranch> // $Then
 * type R = TypeNotPredicate<string, undefined, $SelectionBranch> // $Else
 * ```
 */
export type TypeNotPredicate<
	T,
	U,
	$O extends TypeNotPredicate.$Options = {}
> = IsAnyOrNever<
	T,
	$SelectionBranch
> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Then>
	: R extends $Else ? ($ResolveOptions<[$O['distributive'], TypeNotPredicate.$Default['distributive']]> extends true
		? T extends U ? $ResolveSelection<$O, T, $Else> : $ResolveSelection<$O, T, $Then>
		: [T] extends [U] ? $ResolveSelection<$O, T, $Else> : $ResolveSelection<$O, T, $Then>)
	: never : never

export namespace TypeNotPredicate {
	export type $Options = $SelectionOptions & $DistributiveOptions
	export type $Default = $SelectionPredicate & $DistributiveDefault
	export type $Branch = $SelectionBranch & $DistributiveDefault
}

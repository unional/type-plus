import type { IsAnyOrNever } from '../../mix_types/is_any_or_never.js'
import type { $ResolveOptions } from '../resolve_options.js'
import type { $DistributiveDefault, $DistributiveOptions } from './distributive.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $SelectionOptions, $SelectionPredicate, $Then } from './selection.js'

/**
 * 🎭 *predicate*
 * ㊙️ *internal*
 *
 * Validate if `T` is `U`.
 *
 * @example
 * ```ts
 * type R = SelectWithDistribute<undefined, undefined> // true
 *
 * type R = SelectWithDistribute<never, undefined> // false
 * type R = SelectWithDistribute<unknown, undefined> // false
 * type R = SelectWithDistribute<string | boolean, undefined> // false
 *
 * type R = SelectWithDistribute<string | undefined, undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = SelectWithDistribute<undefined, undefined, { selection: 'filter' }> // undefined
 *
 * type R = SelectWithDistribute<never, undefined, { selection: 'filter' }> // never
 * type R = SelectWithDistribute<unknown, undefined, { selection: 'filter' }> // never
 * type R = SelectWithDistribute<string | boolean, undefined, { selection: 'filter' }> // never
 *
 * type R = SelectWithDistribute<string | undefined, undefined> // undefined
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = SelectWithDistribute<undefined | 1, undefined> // boolean
 * type R = SelectWithDistribute<undefined | 1, undefined, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = SelectWithDistribute<undefined, undefined, $SelectionBranch> // $Then
 * type R = SelectWithDistribute<string, undefined, $SelectionBranch> // $Else
 * ```
 */
export type SelectWithDistribute<
	T,
	U,
	$O extends SelectWithDistribute.$Options = {}
> = IsAnyOrNever<
	T,
	$SelectionBranch
> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Else>
	: R extends $Else ? (
		$ResolveOptions<[$O['distributive'], SelectWithDistribute.$Default['distributive']]> extends true
		? SelectWithDistribute._D<T, U, $O>
		: SelectWithDistribute._N<T, U, $O>
	)
	: never : never

export namespace SelectWithDistribute {
	export type $Options = $SelectionOptions & $DistributiveOptions
	export type $Default = $SelectionPredicate & $DistributiveDefault
	export type $Branch = $SelectionBranch & $DistributiveDefault
	export type _D<T, U, $O extends SelectWithDistribute.$Options> =
		T extends U ? $ResolveSelection<$O, T, $Then> : $ResolveSelection<$O, T, $Else>
	export type _N<T, U, $O extends SelectWithDistribute.$Options> =
		[T] extends [U] ? $ResolveSelection<$O, T, $Then> : $ResolveSelection<$O, T, $Else>
}

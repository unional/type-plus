import type { IsAnyOrNever } from '../../mix_types/is_any_or_never.js'
import type { $ResolveOptions } from '../$resolve_options.js'
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
 * type R = SelectInvertStrictWithDistribute<undefined, undefined> // true
 *
 * type R = SelectInvertStrictWithDistribute<never, undefined> // false
 * type R = SelectInvertStrictWithDistribute<unknown, undefined> // false
 * type R = SelectInvertStrictWithDistribute<string | boolean, undefined> // false
 *
 * type R = SelectInvertStrictWithDistribute<string | undefined, undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = SelectInvertStrictWithDistribute<undefined, undefined, { selection: 'filter' }> // undefined
 *
 * type R = SelectInvertStrictWithDistribute<never, undefined, { selection: 'filter' }> // never
 * type R = SelectInvertStrictWithDistribute<unknown, undefined, { selection: 'filter' }> // never
 * type R = SelectInvertStrictWithDistribute<string | boolean, undefined, { selection: 'filter' }> // never
 *
 * type R = SelectInvertStrictWithDistribute<string | undefined, undefined> // undefined
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = SelectInvertStrictWithDistribute<undefined | 1, undefined> // boolean
 * type R = SelectInvertStrictWithDistribute<undefined | 1, undefined, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = SelectInvertStrictWithDistribute<undefined, undefined, $SelectionBranch> // $Then
 * type R = SelectInvertStrictWithDistribute<string, undefined, $SelectionBranch> // $Else
 * ```
 */
export type SelectInvertStrictWithDistribute<
	T,
	U,
	$O extends SelectInvertStrictWithDistribute.$Options = {}
> = IsAnyOrNever<
	T,
	$SelectionBranch
> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Then>
	: R extends $Else ? (
		$ResolveOptions<[$O['distributive'], SelectInvertStrictWithDistribute.$Default['distributive']]> extends true
		? SelectInvertStrictWithDistribute._D<T, U, $O>
		: SelectInvertStrictWithDistribute._N<T, U, $O>
	)
	: never : never

export namespace SelectInvertStrictWithDistribute {
	export type $Options = $SelectionOptions & $DistributiveOptions
	export type $Default = $SelectionPredicate & $DistributiveDefault
	export type $Branch = $SelectionBranch & $DistributiveDefault
	export type _D<T, U, $O extends SelectInvertStrictWithDistribute.$Options> =
		T extends U ? $ResolveSelection<$O, T, $Else>
		: $ResolveSelection<$O, T, $Then>
	// T extends U ? U extends T
	// ? $ResolveSelection<$O, T, $Else>
	// : $ResolveSelection<$O, T, $Then>
	// : $ResolveSelection<$O, T, $Then>
	export type _N<T, U, $O extends SelectInvertStrictWithDistribute.$Options> =
		[T, U] extends [U, T] ? $ResolveSelection<$O, T, $Else> : $ResolveSelection<$O, T, $Then>
}

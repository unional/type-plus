import type { $ResolveOptions } from '../$resolve_options.js'
import type { $Any } from '../../any/any.js'
import type { IsAny } from '../../any/is_any.js'
import type { IsNever } from '../../never/is_never.js'
import type { $Never } from '../../never/never.js'
import type { $ResolveBranch } from './$resolve_branch.js'
import type { $SelectionOptions } from './$selection_options.js'
import type { $DistributiveDefault, $DistributiveOptions } from './$distributive.js'
import type { $Else, $SelectionBranch, $SelectionPredicate, $Then } from './selection.js'

/**
 * 🎭 *predicate*
 * ㊙️ *internal*
 *
 * Validate if `T` is `U`.
 *
 * @example
 * ```ts
 * type R = SelectStrictWithDistribute<undefined, undefined> // true
 *
 * type R = SelectStrictWithDistribute<never, undefined> // false
 * type R = SelectStrictWithDistribute<unknown, undefined> // false
 * type R = SelectStrictWithDistribute<string | boolean, undefined> // false
 *
 * type R = SelectStrictWithDistribute<string | undefined, undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = SelectStrictWithDistribute<undefined, undefined, { selection: 'filter' }> // undefined
 *
 * type R = SelectStrictWithDistribute<never, undefined, { selection: 'filter' }> // never
 * type R = SelectStrictWithDistribute<unknown, undefined, { selection: 'filter' }> // never
 * type R = SelectStrictWithDistribute<string | boolean, undefined, { selection: 'filter' }> // never
 *
 * type R = SelectStrictWithDistribute<string | undefined, undefined> // undefined
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = SelectStrictWithDistribute<undefined | 1, undefined> // boolean
 * type R = SelectStrictWithDistribute<undefined | 1, undefined, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = SelectStrictWithDistribute<undefined, undefined, $SelectionBranch> // $Then
 * type R = SelectStrictWithDistribute<string, undefined, $SelectionBranch> // $Else
 * ```
 */
export type SelectStrictWithDistribute<
	T,
	U,
	$O extends SelectStrictWithDistribute.$Options = {}
> =
	IsAny<
		T,
		{
			$then: $ResolveBranch<T, $O, [$Any, $Else]>,
			$else:
			IsNever<
				T,
				{
					$then: $ResolveBranch<T, $O, [$Never, $Else]>,
					$else: $ResolveOptions<[$O['distributive'], SelectStrictWithDistribute.$Default['distributive']]> extends true
					? SelectStrictWithDistribute._D<T, U, $O>
					: SelectStrictWithDistribute._N<T, U, $O>

				}
			>
		}
	>

export namespace SelectStrictWithDistribute {
	export type $Options = $SelectionOptions & $DistributiveOptions
	export type $Default = $SelectionPredicate & $DistributiveDefault
	export type $Branch = $SelectionBranch & $DistributiveDefault
	export type _D<T, U, $O extends SelectStrictWithDistribute.$Options> =
		T extends U ? U extends T
		? $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Else]>
	export type _N<T, U, $O extends SelectStrictWithDistribute.$Options> =
		[T, U] extends [U, T] ? $ResolveBranch<T, $O, [$Then]> : $ResolveBranch<T, $O, [$Else]>
}

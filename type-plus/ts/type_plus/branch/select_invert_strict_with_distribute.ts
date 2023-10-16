import type { $ResolveOptions } from '../$resolve_options.js'
import type { $Any } from '../../any/any.js'
import type { IsAny } from '../../any/is_any.js'
import type { IsNever } from '../../never/is_never.js'
import type { $Never } from '../../never/never.js'
import type { IsUnknown } from '../../unknown/is_unknown.js'
import type { $Unknown } from '../../unknown/unknown.js'
import type { $InputOptions } from './$input_options.js'
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
> =
	IsAny<
		T,
		{
			$then: $ResolveBranch<T, $O, [$Any, $Then]>,
			$else:
			IsNever<
				T,
				{
					$then: $ResolveBranch<T, $O, [$Never, $Then]>,
					$else: IsUnknown<
						T,
						{
							$then: $ResolveBranch<T, $O, [$Unknown, $Then]>,
							$else: $ResolveOptions<[$O['distributive'], SelectInvertStrictWithDistribute.$Default['distributive']]> extends true
							? SelectInvertStrictWithDistribute._D<T, U, $O>
							: SelectInvertStrictWithDistribute._N<T, U, $O>
						}
					>
				}
			>
		}
	>

export namespace SelectInvertStrictWithDistribute {
	export type $Options = $SelectionOptions & $DistributiveOptions & $InputOptions<$Any | $Unknown | $Never>
	export type $Default = $SelectionPredicate & $DistributiveDefault
	export type $Branch = $SelectionBranch & $DistributiveDefault
	export type _D<T, U, $O extends SelectInvertStrictWithDistribute.$Options> =
		T extends U ? $ResolveBranch<T, $O, [$Else]> : $ResolveBranch<T, $O, [$Then]>
	export type _N<T, U, $O extends SelectInvertStrictWithDistribute.$Options> =
		[T, U] extends [U, T] ? $ResolveBranch<T, $O, [$Else]> : $ResolveBranch<T, $O, [$Then]>
}

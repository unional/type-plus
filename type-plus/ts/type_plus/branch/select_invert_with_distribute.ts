import type { $ResolveOptions } from '../$resolve_options.js'
import type { $Any } from '../../any/any.js'
import type { IsAny } from '../../any/is_any.js'
import type { IsNever } from '../../never/is_never.js'
import type { $Never } from '../../never/never.js'
import type { IsUnknown } from '../../unknown/is_unknown.js'
import type { $Unknown } from '../../unknown/unknown.js'
import type { $InputOptions } from './$input_options.js'
import type { $ResolveBranch } from './$resolve_branch.js'
import type { $ResolveSelection } from './$resolve_selection.js'
import type { $SelectionOptions } from './$selection_options.js'
import type { $DistributiveDefault, $DistributiveOptions } from './distributive.js'
import type { $Else, $SelectionBranch, $SelectionPredicate, $Then } from './selection.js'

/**
 * 🎭 *predicate*
 * ㊙️ *internal*
 *
 * Validate if `T` is `U`.
 *
 * @example
 * ```ts
 * type R = SelectInvertWithDistribute<undefined, undefined> // true
 *
 * type R = SelectInvertWithDistribute<never, undefined> // false
 * type R = SelectInvertWithDistribute<unknown, undefined> // false
 * type R = SelectInvertWithDistribute<string | boolean, undefined> // false
 *
 * type R = SelectInvertWithDistribute<string | undefined, undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = SelectInvertWithDistribute<undefined, undefined, { selection: 'filter' }> // undefined
 *
 * type R = SelectInvertWithDistribute<never, undefined, { selection: 'filter' }> // never
 * type R = SelectInvertWithDistribute<unknown, undefined, { selection: 'filter' }> // never
 * type R = SelectInvertWithDistribute<string | boolean, undefined, { selection: 'filter' }> // never
 *
 * type R = SelectInvertWithDistribute<string | undefined, undefined> // undefined
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = SelectInvertWithDistribute<undefined | 1, undefined> // boolean
 * type R = SelectInvertWithDistribute<undefined | 1, undefined, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = SelectInvertWithDistribute<undefined, undefined, $SelectionBranch> // $Then
 * type R = SelectInvertWithDistribute<string, undefined, $SelectionBranch> // $Else
 * ```
 */
export type SelectInvertWithDistribute<
	T,
	U,
	$O extends SelectInvertWithDistribute.$Options = {}
> =
	IsAny<
		T,
		{
			$then: $ResolveBranch<
				$O,
				[$Any, $Then],
				$ResolveSelection<$O, T, $Then>
			>,
			$else:
			IsNever<
				T,
				{
					$then: $ResolveBranch<
						$O,
						[$Never, $Then],
						$ResolveSelection<$O, T, $Then>
					>,
					$else: IsUnknown<
						T,
						{
							$then: $ResolveBranch<
								$O,
								[$Unknown, $Then],
								$ResolveSelection<$O, T, $Then>
							>,
							$else: $ResolveOptions<[$O['distributive'], SelectInvertWithDistribute.$Default['distributive']]> extends true
							? T extends U ? $ResolveSelection<$O, T, $Else> : $ResolveSelection<$O, T, $Then>
							: SelectInvertWithDistribute._N<T, U, $O>
						}
					>
				}
			>
		}
	>

export namespace SelectInvertWithDistribute {
	export type $Options = $SelectionOptions & $DistributiveOptions & $InputOptions<$Any | $Unknown | $Never>
	export type $Default = $SelectionPredicate & $DistributiveDefault
	export type $Branch = $SelectionBranch & $DistributiveDefault
	export type _N<T, U, $O extends SelectInvertWithDistribute.$Options> =
		[T] extends [U] ? $ResolveSelection<$O, T, $Else> : $ResolveSelection<$O, T, $Then>

}
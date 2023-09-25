import type { SelectInvertWithDistribute } from '../type_plus/branch/select_invert_with_distribute.js'
import type { $ResolveSelection, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { IsUndefined } from '../undefined/is_undefined.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Validate if `T` is not exactly `void`.
 *
 * ```ts
 * type R = IsNotVoid<1> // $Then
 *
 * type R = IsNotVoid<void> // $Else
 *
 * type R = IsNotVoid<1, $SelectionPredicate> // true
 * type R = IsNotVoid<void, $SelectionPredicate> // false
 * ```
 */
export type IsNotVoid<
	T,
	$O extends IsNotVoid.$Options = {}
> = IsUndefined<T, $SelectionBranch> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Then>
	: SelectInvertWithDistribute<T, void, $O>
	: never

export namespace IsNotVoid {
	export type $Options = SelectInvertWithDistribute.$Options
	export type $Default = SelectInvertWithDistribute.$Default
	export type $Branch = SelectInvertWithDistribute.$Branch
}

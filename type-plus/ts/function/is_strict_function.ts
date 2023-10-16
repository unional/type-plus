import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { SelectStrictWithDistribute } from '../type_plus/branch/select_strict_with_distribute.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * Is `T` exactly `Function`.
 *
 * ```ts
 * type R = IsStrictFunction<Function> // true
 *
 * type R = IsStrictFunction<() => void> // false
 * type R = IsStrictFunction<(() => void) & { a: 1 }> // false
 * ```
 */
export type IsStrictFunction<T, $O extends IsStrictFunction.$Options = {}> =
	IsAnyOrNever<
		T,
		$SelectionBranch
	> extends infer R
	? R extends $Then ? $ResolveBranch<T, $O, [$Else]>
	: R extends $Else ? (
		$ResolveOptions<[$O['distributive'], SelectStrictWithDistribute.$Default['distributive']]> extends true
		? IsStrictFunction._D<T, $O>
		: SelectStrictWithDistribute._N<T, Function, $O>
	)
	: never : never

export namespace IsStrictFunction {
	export type $Options = SelectStrictWithDistribute.$Options
	export type $Default = SelectStrictWithDistribute.$Default
	export type $Branch = SelectStrictWithDistribute.$Branch
	export type _D<T, $O extends SelectStrictWithDistribute.$Options> =
		T extends Function
		? T extends (...args: any[]) => any
		? $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
}

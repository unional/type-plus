import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { SelectInvertStrictWithDistribute } from '../type_plus/branch/select_invert_strict_with_distribute.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'

/**
 * Is `T` not exactly `Function`.
 *
 * ```ts
 * type R = IsNotStrictFunction<Function> // false
 *
 * type R = IsNotStrictFunction<() => void> // true
 * type R = IsNotStrictFunction<(() => void) & { a: 1 }> // true
 * ```
 */

export type IsNotStrictFunction<T, $O extends IsNotStrictFunction.$Options = {}> =
	IsAnyOrNever<
		T,
		$SelectionBranch
	> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Then>
	: R extends $Else ? (
		$ResolveOptions<[$O['distributive'], SelectInvertStrictWithDistribute.$Default['distributive']]> extends true
		? IsNotStrictFunction._D<T, $O>
		: SelectInvertStrictWithDistribute._N<T, Function, $O>
	)
	: never : never

export namespace IsNotStrictFunction {
	export type $Options = SelectInvertStrictWithDistribute.$Options
	export type $Default = SelectInvertStrictWithDistribute.$Default
	export type $Branch = SelectInvertStrictWithDistribute.$Branch
	export type _D<T, $O extends IsNotStrictFunction.$Options> =
		T extends Function
		? T extends (...args: any[]) => any
		? $ResolveSelection<$O, T, $Then>
		: $ResolveSelection<$O, T, $Else>
		: $ResolveSelection<$O, T, $Then>
}

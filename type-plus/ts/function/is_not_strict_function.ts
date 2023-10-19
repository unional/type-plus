import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $SelectInvertStrict } from '../type_plus/branch/$select_invert_strict.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

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
	? R extends $Then ? $ResolveBranch<T, $O, [$Then]>
	: R extends $Else ? (
		$ResolveOptions<[$O['distributive'], $SelectInvertStrict.$Default['distributive']]> extends true
		? IsNotStrictFunction._D<T, $O>
		: $SelectInvertStrict._N<T, Function, $O>
	)
	: never : never

export namespace IsNotStrictFunction {
	export type $Options = $SelectInvertStrict.$Options
	export type $Default = $SelectInvertStrict.$Default
	export type $Branch = $SelectInvertStrict.$Branch
	export type _D<T, $O extends IsNotStrictFunction.$Options> =
		T extends Function
		? $ResolveBranch<T, $O, [T extends (...args: any[]) => any ? $Then : $Else]>
		: $ResolveBranch<T, $O, [$Then]>
}

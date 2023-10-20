import type { $Any } from '../any/any.js'
import type { $Never } from '../never/never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $SelectInvertStrict } from '../type_plus/branch/$select_invert_strict.js'
import type { $Else, $Then } from '../type_plus/branch/selection.js'
import type { $Unknown } from '../unknown/unknown.js'

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

export type IsNotStrictFunction<T, $O extends IsNotStrictFunction.$Options = {}> = $SpecialType<T, {
	$any: $ResolveBranch<T, $O, [$Any, $Then]>,
	$unknown: $ResolveBranch<T, $O, [$Unknown, $Then]>,
	$never: $ResolveBranch<T, $O, [$Never, $Then]>,
	$else: (
		$ResolveOptions<[$O['distributive'], $SelectInvertStrict.$Default['distributive']]> extends true
		? IsNotStrictFunction._D<T, $O>
		: $SelectInvertStrict._N<T, Function, $O>
	)
}>

export namespace IsNotStrictFunction {
	export type $Options = $SelectInvertStrict.$Options
	export type $Default = $SelectInvertStrict.$Default
	export type $Branch = $SelectInvertStrict.$Branch
	export type _D<T, $O extends IsNotStrictFunction.$Options> =
		T extends Function
		? $ResolveBranch<T, $O, [T extends (...args: any[]) => any ? $Then : $Else]>
		: $ResolveBranch<T, $O, [$Then]>
}

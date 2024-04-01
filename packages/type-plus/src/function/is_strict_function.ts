import type { $Any } from '../any/any.js'
import type { $Never } from '../never/never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $SelectStrict } from '../type_plus/branch/$select_strict.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'
import type { $Unknown } from '../unknown/unknown.js'

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
export type IsStrictFunction<T, $O extends IsStrictFunction.$Options = {}> = $SpecialType<
	T,
	{
		$any: $ResolveBranch<T, $O, [$Any, $Else]>
		$unknown: $ResolveBranch<T, $O, [$Unknown, $Else]>
		$never: $ResolveBranch<T, $O, [$Never, $Else]>
		$else: $ResolveOptions<[$O['distributive'], $SelectStrict.$Default['distributive']]> extends true
			? IsStrictFunction._D<T, $O>
			: $SelectStrict._N<T, Function, $O>
	}
>

export namespace IsStrictFunction {
	export type $Options = $SelectStrict.$Options
	export type $Default = $SelectStrict.$Default
	export type $Branch = $SelectStrict.$Branch
	export type _D<T, $O extends $SelectStrict.$Options> = T extends Function
		? T extends (...args: any[]) => any
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
}

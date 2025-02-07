import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $SelectStrict } from '../$type/$select_strict.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'

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
export type IsStrictFunction<T, $O extends IsStrictFunction.$Options = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<T, $O, [$Any, $Else]>
		$never: $ResolveBranch<T, $O, [$Never, $Else]>
		$unknown: $ResolveBranch<T, $O, [$Unknown, $Else]>
		$void: $ResolveBranch<T, $O, [$Void, $Else]>
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

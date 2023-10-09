import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $ResolveSelection } from '../type_plus/branch/$resolve_selection.js'
import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is not a tuple, excluding array.
 *
 * ```ts
 * type R = IsNotTuple<[]>       // false
 * type R = IsNotTuple<[1]>      // false
 *
 * type R = IsNotTuple<number[]> // true
 * type R = IsNotTuple<string>   // true
 * type R = IsNotTuple<never>    // true
 * type R = IsNotTuple<unknown>  // true
 * ```
 */
export type IsNotTuple<
	T,
	$O extends IsNotTuple.$Options = {}
> = IsAnyOrNever<
	T,
	$SelectionBranch
> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Then>
	: R extends $Else ? (
		$ResolveOptions<[$O['distributive'], SelectWithDistribute.$Default['distributive']]> extends true
		? (
			T extends readonly any[]
			? (
				number extends T['length']
				? $ResolveSelection<$O, T, $Then>
				: $ResolveSelection<$O, T, $Else>
			)
			: $ResolveSelection<$O, T, $Then>
		)
		: (
			[T] extends [readonly any[]]
			? (
				number extends T['length']
				? $ResolveSelection<$O, T, $Then>
				: $ResolveSelection<$O, T, $Else>
			)
			: $ResolveSelection<$O, T, $Then>
		)
	)
	: never : never

export namespace IsNotTuple {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}

import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $NeverOptions } from '../never/never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is a tuple, excluding array.
 *
 * ```ts
 * type R = IsTuple<[]>       // true
 *
 * type R = IsTuple<number[]> // false
 * type R = IsTuple<string>   // false
 * type R = IsTuple<never>    // false
 * type R = IsTuple<unknown>  // false
 * ```
 */
export type IsTuple<
	T,
	$O extends IsTuple.$Options = {}
> = IsAnyOrNever<
	T,
	$SelectionBranch
> extends infer R
	? R extends $Then ? $ResolveBranch<T, $O, [$Else]>
	: R extends $Else ? (
		$ResolveOptions<[$O['distributive'], SelectWithDistribute.$Default['distributive']]> extends true
		? (
			T extends readonly any[]
			? (
				number extends T['length']
				? $ResolveBranch<T, $O, [$Else]>
				: $ResolveBranch<T, $O, [$Then]>
			)
			: $ResolveBranch<T, $O, [$Else]>
		)
		: (
			[T] extends [readonly any[]]
			? (
				number extends T['length']
				? $ResolveBranch<T, $O, [$Else]>
				: $ResolveBranch<T, $O, [$Then]>
			)
			: $ResolveBranch<T, $O, [$Else]>
		)
	)
	: never : never

export namespace IsTuple {
	export type $Options = SelectWithDistribute.$Options & $NeverOptions
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}

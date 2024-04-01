import type { $Any } from '../any/any.js'
import type { $Never } from '../never/never.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $DistributiveDefault, $DistributiveOptions } from '../type_plus/branch/$distributive.js'
import type { $InputOptions } from '../type_plus/branch/$input_options.js'
import type { $IsDistributive } from '../type_plus/branch/$is_distributive.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $SelectionBranch, $SelectionPredicate, $Then } from '../type_plus/branch/$selection.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'
import type { $Unknown } from '../unknown/unknown.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `A` is assignable to `B`.
 *
 * @example
 * ```ts
 * type R = Assignable<any, any> // true
 * type R = Assignable<any, 1> // true
 * type R = Assignable<unknown, unknown> // true
 * type R = Assignable<never, never> // true
 * type R = Assignable<1, 1> // true
 * type R = Assignable<'a', 'a'> // true
 * type R = Assignable<'a', 'b'> // false
 * type R = Assignable<'a', string> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `A` is assignable to `B`.
 *
 * @example
 * ```ts
 * type R = Assignable<any, any, { selection: 'filter' }> // any
 * type R = Assignable<1, number, { selection: 'filter' }> // 1
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = Assignable<any, any, Assignable.$Branch> // $Then
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = Assignable<any, any, { $any: 1 }> // 1
 * type R = Assignable<unknown, any, { $unknown: 1 }> // 1
 * type R = Assignable<never, any, { $never: 1 }> // 1
 * ```
 */
export type Assignable<A, B, $O extends Assignable.$Options = {}> = $SpecialType<
	B,
	{
		$any: $ResolveBranch<A, $O, [0 extends 1 & A ? $Any : unknown, $Then]>
		$unknown: $ResolveBranch<A, $O, [[A, unknown] extends [unknown, A] ? $Unknown : unknown, $Then]>
		$never: $ResolveBranch<A, $O, [A, never] extends [never, A] ? [$Never, $Then] : [$Else]>
		$else: $SpecialType<
			A,
			{
				$any: $ResolveBranch<A, $O, [$Any, $Then]>
				$unknown: $ResolveBranch<A, $O, [$Unknown, $Then]>
				$never: $ResolveBranch<A, $O, [$Never, $Then]>
				$else: Assignable.$<A, B, $O>
			}
		>
	}
>

export namespace Assignable {
	export type $Options = $SelectionOptions & $DistributiveOptions & $InputOptions<$Any | $Unknown | $Never>
	export type $Default = $SelectionPredicate & $DistributiveDefault
	export type $Branch<$O extends $DistributiveOptions = {}> = $SelectionBranch & $O

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `A` is assignable to `B`.
	 *
	 * This is the internal logic of `Assignable`.
	 * It does not check against special types.
	 *
	 * It is suitable for building custom types.
	 */
	export type $<A, B, $O extends $UtilOptions> = $IsDistributive<
		$O,
		{
			$then: A extends B ? $ResolveBranch<A, $O, [$Then]> : $ResolveBranch<A, $O, [$Else]>
			$else: [A] extends [B] ? $ResolveBranch<A, $O, [$Then]> : $ResolveBranch<A, $O, [$Else]>
		}
	>

	export type $UtilOptions = $SelectionOptions & $DistributiveOptions
}

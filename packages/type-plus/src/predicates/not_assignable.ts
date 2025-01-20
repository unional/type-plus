import type { $SpecialType } from '../$type/$special_type.js'
import type { $DistributiveDefault, $DistributiveOptions } from '../$type/branch/$distributive.js'
import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $IsDistributive } from '../$type/branch/$is_distributive.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $SelectionBranch, $SelectionPredicate, $Then } from '../$type/branch/$selection.js'
import type { $SelectionOptions } from '../$type/branch/$selection_options.js'
import type { $Any } from '../any/$any.js'
import type { $Never } from '../never/never.js'
import type { $Unknown } from '../unknown/unknown.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `A` is not assignable to `B`.
 *
 * @example
 * ```ts
 * type R = NotAssignable<any, any> // false
 * type R = NotAssignable<any, 1> // false
 * type R = NotAssignable<unknown, unknown> // false
 * type R = NotAssignable<never, never> // false
 * type R = NotAssignable<1, 1> // false
 * type R = NotAssignable<'a', 'a'> // false
 * type R = NotAssignable<'a', 'b'> // true
 * type R = NotAssignable<'a', string> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `A` is not assignable to `B`.
 *
 * @example
 * ```ts
 * type R = NotAssignable<any, any, { selection: 'filter' }> // never
 * type R = NotAssignable<string, number, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = NotAssignable<any, any, NotAssignable.$Branch> // $Else
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = NotAssignable<any, any, { $any: 1 }> // 1
 * type R = NotAssignable<unknown, any, { $unknown: 1 }> // 1
 * type R = NotAssignable<never, any, { $never: 1 }> // 1
 * ```
 */
export type NotAssignable<A, B, $O extends NotAssignable.$Options = {}> = $SpecialType<
	B,
	{
		$any: $ResolveBranch<A, $O, [0 extends 1 & A ? $Any : unknown, $Else]>
		$unknown: $ResolveBranch<A, $O, [[A, unknown] extends [unknown, A] ? $Unknown : unknown, $Else]>
		$never: $ResolveBranch<A, $O, [A, never] extends [never, A] ? [$Never, $Else] : [$Then]>
		$else: $SpecialType<
			A,
			{
				$any: $ResolveBranch<A, $O, [$Any, $Else]>
				$unknown: $ResolveBranch<A, $O, [$Unknown, $Else]>
				$never: $ResolveBranch<A, $O, [$Never, $Else]>
				$else: NotAssignable.$<A, B, $O>
			}
		>
	}
>

export namespace NotAssignable {
	export type $Options = $SelectionOptions & $DistributiveOptions & $InputOptions<$Any | $Unknown | $Never>
	export type $Default = $SelectionPredicate & $DistributiveDefault
	export type $Branch<$O extends $DistributiveOptions = {}> = $SelectionBranch & $O

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `A` is assignable to `B`.
	 *
	 * This is the internal logic of `NotAssignable`.
	 * It does not check against special types.
	 *
	 * It is suitable for building custom types.
	 */
	export type $<A, B, $O extends $UtilOptions> = $IsDistributive<
		$O,
		{
			$then: A extends B ? $ResolveBranch<A, $O, [$Else]> : $ResolveBranch<A, $O, [$Then]>
			$else: [A] extends [B] ? $ResolveBranch<A, $O, [$Else]> : $ResolveBranch<A, $O, [$Then]>
		}
	>

	export type $UtilOptions = $SelectionOptions & $DistributiveOptions
}

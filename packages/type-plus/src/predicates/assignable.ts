import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'

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
export type Assignable<A, B, $O extends Assignable.$Options = {}> = $Special<
	B,
	{
		$any: $ResolveBranch<$O, [0 extends 1 & A ? $Any : unknown, $Then], A>
		$unknown: $ResolveBranch<$O, [[A, unknown] extends [unknown, A] ? $Unknown : unknown, $Then], A>
		$never: $ResolveBranch<$O, [A, never] extends [never, A] ? [$Never, $Then] : [$Else], A>
		$else: $Special<
			A,
			{
				$any: $ResolveBranch<$O, [$Any, $Then], A>
				$unknown: $ResolveBranch<$O, [$Unknown, $Then], A>
				$never: $ResolveBranch<$O, [$Never, $Then], A>
				$else: Assignable.$<A, B, $O>
			}
		>
	}
>

export namespace Assignable {
	export type $Options = $Selection.Options & $Distributive.Options & $InputOptions<$Any | $Unknown | $Never>
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch<$O extends $Distributive.Options = {}> = $Selection.Branch & $O

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
	export type $<A, B, $O extends $UtilOptions> = $Distributive.Parse<
		$O,
		{
			$then: A extends B ? $ResolveBranch<$O, [$Then], A> : $ResolveBranch<$O, [$Else], A>
			$else: [A] extends [B] ? $ResolveBranch<$O, [$Then], A> : $ResolveBranch<$O, [$Else], A>
		}
	>

	export type $UtilOptions = $Selection.Options & $Distributive.Options
}

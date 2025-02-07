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
 * Validate if `A` is not assignable to `B`.]
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
export type NotAssignable<A, B, $O extends NotAssignable.$Options = {}> = $Special<
	B,
	{
		$any: $ResolveBranch<$O, [0 extends 1 & A ? $Any : unknown, $Else], A>
		$unknown: $ResolveBranch<$O, [[A, unknown] extends [unknown, A] ? $Unknown : unknown, $Else], A>
		$never: $ResolveBranch<$O, [A, never] extends [never, A] ? [$Never, $Else] : [$Then], A>
		$else: $Special<
			A,
			{
				$any: $ResolveBranch<$O, [$Any, $Else], A>
				$unknown: $ResolveBranch<$O, [$Unknown, $Else], A>
				$never: $ResolveBranch<$O, [$Never, $Else], A>
				$else: NotAssignable.$<A, B, $O>
			}
		>
	}
>

export namespace NotAssignable {
	export type $Options = $Selection.Options & $Distributive.Options & $InputOptions<$Any | $Unknown | $Never>
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch<$O extends $Distributive.Options = {}> = $Selection.Branch & $O

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
	export type $<A, B, $O extends $UtilOptions> = $Distributive.Parse<
		$O,
		{
			$then: A extends B ? $ResolveBranch<$O, [$Else], A> : $ResolveBranch<$O, [$Then], A>
			$else: [A] extends [B] ? $ResolveBranch<$O, [$Else], A> : $ResolveBranch<$O, [$Then], A>
		}
	>

	export type $UtilOptions = $Selection.Options & $Distributive.Options
}

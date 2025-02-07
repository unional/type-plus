import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsNumber } from '../number/is_number.js'

/**
 * Is T an integer, including bigint.
 *
 * ```ts
 * type R = IsInteger<0> // true
 * type R = IsInteger<1n> // true
 *
 * type R = IsInteger<1.1> // false
 * type R = IsInteger<number> // false as it contains non-integer
 * ```
 */
export type IsInteger<T, $O extends IsInteger.$Options = {}> = IsNumber<
	T,
	{
		distributive: $O['distributive']
		$then: number extends T
			? $ResolveBranch<$O, [$Then], number> | $ResolveBranch<$O, [$Else]>
			: T extends number & infer U
				? `${T}` extends `${number}.${number}`
					? $ResolveBranch<$O, [$Else]>
					: [T, U] extends [U, T]
						? $ResolveBranch<$O, [$Then], T>
						: $ResolveBranch<$O, [$Then], number> | $ResolveBranch<$O, [$Else]>
				: never
		$else: IsBigint<
			T,
			{
				distributive: $O['distributive']
				$then: $ResolveBranch<$O, [$Then], T>
				$else: $ResolveBranch<$O, [$Else]>
			}
		>
	}
>
export namespace IsInteger {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}

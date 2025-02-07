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
 * Is `T` a negative numeric type.
 *
 * ```ts
 * type R = IsNegative<-1> // true
 * type R = IsNegative<-1n> // true
 *
 * type R = IsNegative<0> // false
 * type R = IsNegative<1> // false
 *
 * type R = IsNegative<number> // boolean
 * type R = IsNegative<bigint> // boolean
 * type R = IsNegative<any> // boolean
 * ```
 */
export type IsNegative<T, $O extends IsNegative.$Options = {}> = IsBigint<
	T,
	{
		distributive: $O['distributive']
		$then: IsNegative._Negative<T, bigint, $O>
		$else: IsNumber<
			Exclude<T, bigint>,
			{
				distributive: $O['distributive']
				$then: IsNegative._Negative<T, number, $O>
				$else: $ResolveBranch<$O, [$Else]>
			}
		>
	}
>

export namespace IsNegative {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	export type _Negative<T, U extends number | bigint, $O extends IsNegative.$Options> = T extends U & infer R
		? `${T}` extends `-${string}`
			? $ResolveBranch<$O, [$Then], T>
			: U extends T
				? $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
				: [T, R] extends [R, T]
					? $ResolveBranch<$O, [$Else]>
					: $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
		: never
}

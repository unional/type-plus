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
 * Is `T` a not a negative numeric type.
 *
 * ```ts
 * type R = IsNotNegative<1> // true
 * type R = IsNotNegative<0> // true
 * type R = IsNotNegative<1n> // true
 *
 * type R = IsNotNegative<-1> // false
 *
 * type R = IsNotNegative<number> // boolean
 * type R = IsNotNegative<bigint> // boolean
 * type R = IsNotNegative<any> // boolean
 * ```
 */
export type IsNotNegative<T, $O extends IsNotNegative.$Options = {}> = IsBigint<
	T,
	{
		distributive: $O['distributive']
		$then: $Then
		$else: $Else
	}
> extends infer R
	? R extends $Then
		? IsNotNegative._Negative<T, bigint, $O>
		: IsNumber<
				Exclude<T, bigint>,
				{
					distributive: $O['distributive']
					$then: IsNotNegative._Negative<T, number, $O>
					$else: $ResolveBranch<Exclude<T, number | bigint>, $O, [$Then]>
				}
			>
	: never

export namespace IsNotNegative {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
	export type _Negative<T, U extends number | bigint, $O extends IsNotNegative.$Options> = T extends U
		? `${T}` extends `-${string}`
			? $ResolveBranch<T, $O, [$Else]>
			: U extends T
				? $ResolveBranch<T, $O, [$Then]> | $ResolveBranch<T, $O, [$Else]>
				: $ResolveBranch<T, $O, [$Then]>
		: never
}

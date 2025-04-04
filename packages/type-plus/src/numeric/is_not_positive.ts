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
 * Is `T` not a positive numeric type.
 *
 * ```ts
 * type R = IsNotPositive<-1> // true
 * type R = IsNotPositive<-1n> // true
 *
 * type R = IsNotPositive<0> // false
 * type R = IsNotPositive<1> // false
 *
 * type R = IsNotPositive<number> // boolean
 * type R = IsNotPositive<bigint> // boolean
 * type R = IsNotPositive<any> // boolean
 *
 * ```
 */
export type IsNotPositive<T, $O extends IsNotPositive.$Options = {}> = IsBigint<
	T,
	{
		distributive: $O['distributive']
		$then: $Then
		$else: $Else
	}
> extends infer R
	? R extends $Then
		? IsNotPositive._Negative<T, bigint, $O>
		: IsNumber<Exclude<T, bigint>, { distributive: $O['distributive']; $then: $Then; $else: $Else }> extends infer R
			? R extends $Then
				? IsNotPositive._Negative<T, number, $O>
				: $ResolveBranch<$O, [$Then], Exclude<T, number | bigint>>
			: never
	: never

export namespace IsNotPositive {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	export type _Negative<T, U extends number | bigint, $O extends IsNotPositive.$Options> = T extends U
		? `${T}` extends `-${string}`
			? $ResolveBranch<$O, [$Then], T>
			: U extends T
				? $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
				: $ResolveBranch<$O, [$Else]>
		: never
}

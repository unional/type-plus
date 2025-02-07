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
 * Is `T` a positive numeric type.
 *
 * ```ts
 * type R = IsPositive<1> // true
 * type R = IsPositive<0> // true
 * type R = IsPositive<1n> // true
 *
 * type R = IsPositive<number> // boolean
 * type R = IsPositive<bigint> // boolean
 * type R = IsPositive<any> // boolean
 *
 * type R = IsPositive<-1> // false
 * ```
 */
export type IsPositive<T, $O extends IsPositive.$Options = {}> = IsBigint<
	T,
	{
		distributive: $O['distributive']
		$then: $Then
		$else: $Else
	}
> extends infer R
	? R extends $Then
		? IsPositive._Positive<T, bigint, $O>
		: IsNumber<Exclude<T, bigint>, { distributive: $O['distributive']; $then: $Then; $else: $Else }> extends infer R
			? R extends $Then
				? IsPositive._Positive<T, number, $O>
				: $ResolveBranch<$O, [$Else], T>
			: never
	: never

export namespace IsPositive {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	export type _Positive<T, U extends number | bigint, $O extends IsPositive.$Options> = T extends U & infer R
		? `${T}` extends `-${string}`
			? $ResolveBranch<$O, [$Else], T>
			: U extends T
				? $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else], T>
				: [T, R] extends [R, T]
					? $ResolveBranch<$O, [$Then], T>
					: $ResolveBranch<$O, [$Then], number> | $ResolveBranch<$O, [$Else], T>
		: never
}

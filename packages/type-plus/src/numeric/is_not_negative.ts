import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsNumber } from '../number/is_number.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'

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
		: IsNumber<Exclude<T, bigint>, { distributive: $O['distributive'];
			 $then: IsNotNegative._Negative<T, number, $O>
			 $else: $ResolveBranch<Exclude<T, number | bigint>, $O, [$Then]>
			 }>
	: never

export namespace IsNotNegative {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>
	export type _Negative<T, U extends number | bigint, $O extends IsNotNegative.$Options> = T extends U
		? `${T}` extends `-${string}`
			? $ResolveBranch<T, $O, [$Else]>
			: U extends T
				? $ResolveBranch<T, $O, [$Then]> | $ResolveBranch<T, $O, [$Else]>
				: $ResolveBranch<T, $O, [$Then]>
		: never
}

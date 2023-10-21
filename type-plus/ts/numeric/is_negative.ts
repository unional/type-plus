import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsNumber } from '../number/is_number.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Select } from '../type_plus/branch/$select.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'

/**
 * Is `T` a positive numeric type.
 *
 * ```ts
 * type R = IsNegative<1> // true
 * type R = IsNegative<0> // true
 * type R = IsNegative<1n> // true
 *
 * type R = IsNegative<number> // boolean
 * type R = IsNegative<bigint> // boolean
 * type R = IsNegative<any> // boolean
 *
 * type R = IsNegative<-1> // false
 * ```
 */
export type IsNegative<T, $O extends IsNegative.$Options = {}> = IsBigint<T, {
	distributive: $O['distributive'],
	$then: $Then,
	$else: $Else
}> extends infer R
	? R extends $Then ? IsNegative._Negative<T, bigint, $O>
	: (
		IsNumber<Exclude<T, bigint>, { distributive: $O['distributive'], $then: $Then, $else: $Else }> extends infer R
		? (
			R extends $Then
			? IsNegative._Negative<T, number, $O>
			: $ResolveBranch<T,$O, [$Else]>
		)
		: never
	)
	: never

export namespace IsNegative {
	export type $Options = $Select.$Options
	export type $Default = $Select.$Default
	export type $Branch = $Select.$Branch
	export type _Negative<T, U extends number | bigint, $O extends IsNegative.$Options> = T extends U
		? (
			`${T}` extends `-${string}`
			? $ResolveBranch<T,$O, [$Then]>
			: U extends T ? $ResolveBranch<T,$O, [$Then]> | $ResolveBranch<T,$O, [$Else]> : $ResolveBranch<T,$O, [$Else]>
		)
		: never
}

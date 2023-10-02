import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsNumber } from '../number/is_number.js'
import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'
import type { $Else, $ResolveSelection, $Then } from '../type_plus/branch/selection.js'

/**
 * Is `T` a positive numeric type.
 *
 * ```ts
 * type R = IsNotPositive<1> // true
 * type R = IsNotPositive<0> // true
 * type R = IsNotPositive<1n> // true
 *
 * type R = IsNotPositive<number> // boolean
 * type R = IsNotPositive<bigint> // boolean
 * type R = IsNotPositive<any> // boolean
 *
 * type R = IsNotPositive<-1> // false
 * ```
 */
export type IsNotPositive<T, $O extends IsNotPositive.$Options = {}> = IsBigint<T, {
	distributive: $O['distributive'],
	$then: $Then,
	$else: $Else
}> extends infer R
	? R extends $Then ? IsNotPositive._Negative<T, bigint, $O>
	: (
		IsNumber<Exclude<T, bigint>, { distributive: $O['distributive'], $then: $Then, $else: $Else }> extends infer R
		? (
			R extends $Then
			? IsNotPositive._Negative<T, number, $O>
			: $ResolveSelection<$O, Exclude<T, number | bigint>, $Then>
		)
		: never
	)
	: never

export namespace IsNotPositive {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
	export type _Negative<T, U extends number | bigint, $O extends IsNotPositive.$Options> = T extends U
		? (
			`${T}` extends `-${string}`
			? $ResolveSelection<$O, T, $Then>
			: U extends T ? $ResolveSelection<$O, T, $Then> | $ResolveSelection<$O, T, $Else> : $ResolveSelection<$O, T, $Else>
		)
		: never
}

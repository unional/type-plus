import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsNumber } from '../number/is_number.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'

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
export type IsPositive<T, $O extends IsPositive.$Options = {}> = IsBigint<T, {
	distributive: $O['distributive'],
	$then: $Then,
	$else: $Else
}> extends infer R
	? R extends $Then ? IsPositive._Positive<T, bigint, $O>
	: (
		IsNumber<Exclude<T, bigint>, { distributive: $O['distributive'], $then: $Then, $else: $Else }> extends infer R
		? (
			R extends $Then
			? IsPositive._Positive<T, number, $O>
			: $ResolveBranch<T, $O, [$Else]>
		)
		: never
	)
	: never

export namespace IsPositive {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>
	export type _Positive<T, U extends number | bigint, $O extends IsPositive.$Options> = T extends U
		? (
			`${T}` extends `-${string}`
			? $ResolveBranch<T, $O, [$Else]>
			: U extends T ? $ResolveBranch<T, $O, [$Then]> | $ResolveBranch<T, $O, [$Else]> : $ResolveBranch<T, $O, [$Then]>
		)
		: never
}

import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsNumber } from '../number/is_number.js'
import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'
import type { $Else, $ResolveSelection, $Then } from '../type_plus/branch/selection.js'

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
export type IsInteger<T, $O extends IsInteger.$Options = {}> = IsNumber<T, {
	distributive: $O['distributive'],
	$then: $Then,
	$else: $Else
}> extends infer R
	? R extends $Then ? (
		number extends T
		? $ResolveSelection<$O, number, $Then> | $ResolveSelection<$O, T, $Else>
		: T extends number ? (
			`${T}` extends `${number}.${number}`
			? $ResolveSelection<$O, T, $Else>
			: $ResolveSelection<$O, T, $Then>
		)
		: never
	)
	: R extends $Else ? (
		IsBigint<T, {
			distributive: $O['distributive'],
			$then: $Then,
			$else: $Else
		}> extends infer R
		? R extends $Then ? $ResolveSelection<$O, T, $Then>
		: $ResolveSelection<$O, T, $Else>
		: never
	)
	: never : never
export namespace IsInteger {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
}

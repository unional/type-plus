import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsNumber } from '../number/is_number.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'

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
		? $ResolveBranch<number, $O, [$Then]> | $ResolveBranch<T, $O, [$Else]>
		: T extends number ? (
			`${T}` extends `${number}.${number}`
			? $ResolveBranch<T, $O, [$Else]>
			: $ResolveBranch<T, $O, [$Then]>
		)
		: never
	)
	: R extends $Else ? (
		IsBigint<T, {
			distributive: $O['distributive'],
			$then: $Then,
			$else: $Else
		}> extends infer R
		? R extends $Then ? $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
		: never
	)
	: never : never
export namespace IsInteger {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>
}

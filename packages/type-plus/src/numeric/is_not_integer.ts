import type { $Equality } from '../$type/$equality.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsNumber } from '../number/is_number.js'

/**
 * Is T not an integer, including bigint.
 *
 * ```ts
 * import type { IsNotInteger } from 'type-plus'
 *
 * type R = IsNotInteger<1.1> // true
 * type R = IsNotInteger<number> // true as it contains non-integer
 *
 * type R = IsNotInteger<0> // false
 * type R = IsNotInteger<1n> // false
 * ```
 */
export type IsNotInteger<T, $O extends IsNotInteger.$Options = {}> = IsNumber<
	T,
	{
		distributive: $O['distributive']
		$then: $Then
		$else: $Else
	}
> extends infer R
	? R extends $Then
		? number extends T
			? $ResolveBranch<T, $O, [$Then]> | $ResolveBranch<T, $O, [$Else]>
			: T extends number
				? `${T}` extends `${number}.${number}`
					? $ResolveBranch<T, $O, [$Then]>
					: $ResolveBranch<T, $O, [$Else]>
				: never
		: R extends $Else
			? IsBigint<
					T,
					{
						distributive: $O['distributive']
						$then: $Then
						$else: $Else
					}
				> extends infer R
				? R extends $Then
					? $ResolveBranch<T, $O, [$Else]>
					: $ResolveBranch<Exclude<T, number>, $O, [$Then]>
				: never
			: never
	: never
export namespace IsNotInteger {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>
}

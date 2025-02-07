import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { IsBigint } from '../bigint/is_bigint.js'
import type { $Equal } from '../equal/equal.js'
import type { IsNumber } from '../number/is_number.js'

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
export type IsInteger<T, $O extends IsInteger.$Options = {}> = IsNumber<
	T,
	{
		distributive: $O['distributive']
		$then: number extends T
			? $ResolveBranch<number, $O, [$Then]> | $ResolveBranch<T, $O, [$Else]>
			: T extends number & infer U
				? `${T}` extends `${number}.${number}`
					? $ResolveBranch<T, $O, [$Else]>
					: [T, U] extends [U, T]
						? $ResolveBranch<T, $O, [$Then]>
						: $ResolveBranch<number, $O, [$Then]> | $ResolveBranch<T, $O, [$Else]>
				: never
		$else: IsBigint<
			T,
			{
				distributive: $O['distributive']
				$then: $ResolveBranch<T, $O, [$Then]>
				$else: $ResolveBranch<T, $O, [$Else]>
			}
		>
	}
>
export namespace IsInteger {
	export type $Options = $Equal.$Options
	export type $Branch<$O extends $Options = {}> = $Equal.$Branch<$O>
}

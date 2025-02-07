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
			? $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
			: T extends number
				? `${T}` extends `${number}.${number}`
					? $ResolveBranch<$O, [$Then], T>
					: $ResolveBranch<$O, [$Else]>
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
					? $ResolveBranch<$O, [$Else]>
					: $ResolveBranch<$O, [$Then], Exclude<T, number>>
				: never
			: never
	: never
export namespace IsNotInteger {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}

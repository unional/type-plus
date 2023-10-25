import type { IsNever } from '../never/is_never.js'
import type { IsNumber } from '../number/is_number.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/$selection.js'

/**
 * 🌪️ *filter*
 *
 * Filter `T` to ensure it is an array, excluding tuple.
 *
 * @example
 * ```ts
 * type R = StrictArrayType<number[]> // number[]
 *
 * type R = StrictArrayType<[1]> // never
 * type R = StrictArrayType<number[] | 1> // never
 * type R = StrictArrayType<number[] & { a: 1 }> // never
 * ```
 */
export type StrictArrayType<T, Then = T, Else = never> = IsNever<
	T,
	$SelectionBranch> extends infer R
	? R extends $Then ? Else
	: R extends $Else ? [any[]] extends [T]
	? ([T] extends [readonly any[]]
		? IsNumber<T['length'], { exact: true, $then: Then, $else: Else }>
		: Else)
	: Else
	: never : never

/**
 * 🌪️ *filter*
 *
 * Filter `T` to ensure it is not an array, excluding tuple.
 *
 * i.e. *tuple* will pass through this filter.
 *
 * @example
 * ```ts
 * type R = NotStrictArrayType<number[]> // never
 *
 * type R = NotStrictArrayType<number> // number
 * type R = NotStrictArrayType<[1]> // [1]
 * ```
 */
export type NotStrictArrayType<T, Then = T, Else = never> = StrictArrayType<T, Else, Then>



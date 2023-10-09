import type { IsNever } from '../never/is_never.js'
import type { IsStrictNumber } from '../number/is_strict_number.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * 🌪️ *filter*
 *
 * Filter `T` to ensure it is an array, excluding tuple.
 *
 * @example
 * ```ts
 * type R = ArrayType<number[]> // number[]
 *
 * type R = ArrayType<[1]> // never
 * type R = ArrayType<number[] | 1> // never
 * type R = ArrayType<number[] & { a: 1 }> // never
 * ```
 */
export type ArrayType<T, Then = T, Else = never> = IsNever<
	T,
	$SelectionBranch> extends infer R
	? R extends $Then ? Else
	: R extends $Else ? [never[]] extends [T]
	? ([T] extends [readonly any[]]
		? IsStrictNumber<T['length'], { $then: Then, $else: Else }>
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
 * type R = NotArrayType<number[]> // never
 *
 * type R = NotArrayType<number> // number
 * type R = NotArrayType<[1]> // [1]
 * ```
 */
export type NotArrayType<T, Then = T, Else = never> = ArrayType<T, Else, Then>

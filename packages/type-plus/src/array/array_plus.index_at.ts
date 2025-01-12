import type { IsAny } from '../any/is_any.js'
import type { IsEqual } from '../equal/equal.js'
import type { Abs } from '../math/abs.js'
import type { GreaterThan } from '../math/greater_than.js'
import type { Subtract } from '../math/subtract.js'
import type { IsNever } from '../never/is_never.js'
import type { IsNumber } from '../number/is_number.js'
import type { IsInteger } from '../numeric/is_integer.js'
import type { IsNegative } from '../numeric/is_negative.js'

/**
 * 🦴 *utilities*
 *
 * Gets the normalized index to access the element of an array or tuple.
 *
 * @example
 * ```ts
 * type R = IndexAt<['a', 'b', 'c'], 2> // 2
 * type R = IndexAt<['a', 'b', 'c'], -2> // 1
 *
 * type R = IndexAt<['a', 'b', 'c'], 3> // never
 * type R = IndexAt<['a', 'b', 'c'], -4> // never
 * ```
 */
export type IndexAt<
	A extends readonly unknown[],
	N extends number,
	Fail = never,
	Upper = A['length'],
	Lower = 0,
> = IsNever<
	A,
	{
		$then: Fail
		$else: IndexAt._<A, N, Fail, Upper, Lower>
	}
>

export namespace IndexAt {
	export type _<A extends readonly unknown[], N extends number, Fail = never, Upper = A['length'], Lower = 0> = IsEqual<
		A['length'],
		0,
		Fail,
		IsInteger<
			N,
			{
				$then: IsNumber<
					A['length'],
					{
						exact: true
						$then: N
						$else: IsNegative<
							N,
							{
								$then: GreaterThan<Abs<N>, A['length']> extends true ? Lower : Subtract<A['length'], Abs<N>>
								$else: GreaterThan<A['length'], N> extends true ? N : Upper
							}
						>
					}
				>
				// N: number or float
				$else: IsAny<
					N,
					{
						$then: number
						$else: IsNumber<N, { exact: true; $then: N; $else: never }>
					}
				>
			}
		>
	>
}

// import type { IsAny } from '../any/is_any.js'
// import type { IsEqual } from '../equal/equal.js'
// import type { Abs } from '../math/abs.js'
// import type { GreaterThan } from '../math/greater_than.js'
// import type { Subtract } from '../math/subtract.js'
// import type { IsNever } from '../never/is_never.js'
// import type { IsStrictNumber } from '../number/is_strict_number.js'
// import type { IsInteger } from '../numeric/is_integer.js'
// import type { IsNegative } from '../numeric/is_negative.js'
// import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

// /**
//  * 🦴 *utilities*
//  *
//  * Gets the normalized index to access the element of an array or tuple.
//  *
//  * @example
//  * ```ts
//  * type R = IndexAt<['a', 'b', 'c'], 2> // 2
//  * type R = IndexAt<['a', 'b', 'c'], -2> // 1
//  *
//  * type R = IndexAt<['a', 'b', 'c'], 3> // never
//  * type R = IndexAt<['a', 'b', 'c'], -4> // never
//  * ```
//  */
// export type IndexAt<
// 	A extends readonly unknown[],
// 	N extends number,
// 	Fail = never,
// 	Upper = A['length'],
// 	Lower = 0
// > = IsNever<
// 	A,
// 	$SelectionBranch> extends infer R
// 	? R extends $Then ? Fail
// 	: R extends $Else ? IndexAt._<A, N, Fail, Upper, Lower>
// 	: never : never

// export namespace IndexAt {
// 	export type _<
// 		A extends readonly unknown[],
// 		N extends number,
// 		Fail = never,
// 		Upper = A['length'],
// 		Lower = 0
// 	> = IsEqual<
// 		A['length'],
// 		0,
// 		Fail,
// 		IsInteger<
// 			N,
// 			IsInteger.$Branch
// 		> extends infer R
// 		? R extends $Then
// 		? IsStrictNumber<
// 			A['length'],
// 			IsStrictNumber.$Branch
// 		> extends infer R
// 		// A: array
// 		? R extends $Then ? N
// 		// A: tuple
// 		: R extends $Else ? IsNegative<
// 			N,
// 			IsNegative.$Branch
// 		> extends infer R
// 		? R extends $Then ? GreaterThan<Abs<N>, A['length']> extends true ? Lower : Subtract<A['length'], Abs<N>>
// 		: GreaterThan<A['length'], N> extends true ? N : Upper
// 		: never
// 		: never : never
// 		// N: number or float
// 		: IsAny<
// 			N,
// 			{
// 				$then: number,
// 				$else: IsStrictNumber<
// 					N,
// 					IsStrictNumber.$Branch
// 				> extends infer R
// 				? R extends $Then ? N : never : never
// 			}
// 		>
// 		: never
// 	>
// }

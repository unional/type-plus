import type { PadLeft, Some, Tail } from '../array/index.js'
import type { IsInteger } from '../number/integer.js'
import type { IsPositive } from '../number/positive.js'
import type { And } from '../predicates/index.js'
import type { Digit, DigitArray } from './Digit.js'
import type { Max } from './Max.js'

export type Subtract<A extends number, B extends number, Fail = never> = And<
	And<IsPositive<A>, IsInteger<A>>,
	And<IsPositive<B>, IsInteger<B>>
> extends true
	? DigitArray.Shift10<DigitArray.FromNumber<A>> extends infer DA
		? DA extends number[]
			? DigitArray.FromNumber<B> extends infer DB
				? DB extends number[]
					? Max<DA['length'], DB['length']> extends infer M
						? M extends number
							? PadLeft<DA, M, 0> extends infer PDA
								? PDA extends number[]
									? PadLeft<DB, M, 0> extends infer PDB
										? PDB extends number[]
											? Subtract.DigitArray<[], PDA, PDB> extends infer Result
												? Result extends number[]
													? Some<Result, never, 'strict'> extends true
														? Fail
														: DigitArray.ToNumber<Result>
													: Fail
												: Fail
											: Fail
										: Fail
									: Fail
								: Fail
							: Fail
						: Fail
					: Fail
				: Fail
			: Fail
		: Fail
	: Fail

export namespace Subtract {
	export type DigitArray<R extends number[], A extends number[], B extends number[]> = A['length'] extends 0
		? R
		: DigitArray<[...R, Digit<A[0], B[0]>], Tail<A>, Tail<B>>

	export type Digit<A extends number, B extends number> = Digit.ToTuple[A] extends [
		...infer U,
		...Digit.ToTuple[B]
	]
		? U['length']
		: never
}

/**
 * A - 1
 */
export type Decrement<A extends number, Fail = never> = Subtract<A, 1, Fail>

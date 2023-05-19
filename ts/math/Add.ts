import type { PadLeft } from '../array/index.js'
import type { IsInteger } from '../numeric/integer.js'
import type { IsPositive } from '../numeric/positive.js'
import type { And } from '../predicates/index.js'
import type { Digit, DigitArray } from './Digit.js'
import type { Max } from './Max.js'

/**
 * Add two number literals.
 */
export type Add<A extends number, B extends number, Fail = never> = And<
	And<IsPositive<A>, IsInteger<A>>,
	And<IsPositive<B>, IsInteger<B>>
> extends false
	? Fail
	: DigitArray.FromNumber<A> extends infer DA
	? DA extends number[]
		? DigitArray.FromNumber<B> extends infer DB
			? DB extends number[]
				? Max<DA['length'], DB['length']> extends infer M
					? M extends number
						? PadLeft<DA, M, 0> extends infer PDA
							? PDA extends number[]
								? PadLeft<DB, M, 0> extends infer PDB
									? PDB extends number[]
										? DigitArray.ToNumber<Add.DigitArray<PDA, PDB>>
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

export namespace Add {
	export type DigitArray<A extends number[], B extends number[]> = A extends [any, ...infer ATail]
		? ATail extends number[]
			? B extends [any, ...infer BTail]
				? BTail extends number[]
					? [Digit<A[0], B[0]>, ...DigitArray<ATail, BTail>]
					: []
				: [A[0], ...DigitArray<[], ATail>]
			: []
		: B extends [any, ...infer BTail]
		? BTail extends number[]
			? [B[0], ...DigitArray<[], BTail>]
			: []
		: []

	export type Digit<A extends number, B extends number> = [...Digit.ToTuple[A], ...Digit.ToTuple[B]]['length']
}
/**
 * Increment `A` by 1.
 */
export type Increment<A extends number, Fail = never> = Add<A, 1, Fail>

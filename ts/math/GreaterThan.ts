import type { Head, PadLeft, Tail } from '../array_plus/index.js'
import type { IsPositive, IsWhole } from '../number_plus/number.js'
import type { And, Equal, Or, Xor } from '../predicates/index.js'
import type { Digit, DigitArray } from './Digit.js'
import type { Max } from './Max.js'

export type GreaterThan<A extends number, B extends number, Fail = never> = And<
	IsWhole<A>,
	IsWhole<B>
> extends false
	? Fail
	: number extends A
	? Fail
	: number extends B
	? Fail
	: Equal<A, B> extends true
	? false
	: Xor<IsPositive<A>, IsPositive<B>> extends true
	? IsPositive<A>
	: Or<IsPositive<A>, IsPositive<B>> extends false
	? GreaterThan.ForWholeNumber<B, A>
	: GreaterThan.ForWholeNumber<A, B>

export namespace GreaterThan {
	export type ForWholeNumber<
		A extends number,
		B extends number
	> = DigitArray.FromNumberAbs<A> extends infer DA
		? DA extends number[]
			? DigitArray.FromNumberAbs<B> extends infer DB
				? DB extends number[]
					? Max<DA['length'], DB['length']> extends infer M
						? M extends number
							? PadLeft<DA, M, 0> extends infer PDA
								? PDA extends number[]
									? PadLeft<DB, M, 0> extends infer PDB
										? PDB extends number[]
											? ForDigitArray<PDA, PDB>
											: never
										: never
									: never
								: never
							: never
						: never
					: never
				: never
			: never
		: never

	export type ForDigitArray<DA extends number[], DB extends number[]> = Equal<Head<DA>, Head<DB>> extends true
		? ForDigitArray<Tail<DA>, Tail<DB>>
		: Digit.GreaterThan<Head<DA>, Head<DB>>
}

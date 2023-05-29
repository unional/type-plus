import { describe, it } from '@jest/globals'
import { testType } from '../index.js'
import type { NumericStruct } from './numeric_struct2.js'

describe('NumericStruct.FromNumeric', () => {
	describe('bigint', () => {
		// Exponent is always 0 as bigint does not support floating point number.
		it('converts positive bigint to ["bigint", ["+", Digits, 0]]', () => {
			testType.equal<NumericStruct.FromNumeric<1n>, ['bigint', ['+', [1], 0]]>(true)

			testType.equal<
				NumericStruct.FromNumeric<1234567890n>,
				['bigint', ['+', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 0]]
			>(true)

			testType.equal<
				NumericStruct.FromNumeric<9007199254740993n>,
				['bigint', ['+', [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 3], 0]]
			>(true)
		})

		it('converts positive bigint to ["bigint", ["-", Digits, 0]]', () => {
			testType.equal<NumericStruct.FromNumeric<-1n>, ['bigint', ['-', [1], 0]]>(true)

			testType.equal<
				NumericStruct.FromNumeric<-1234567890n>,
				['bigint', ['-', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 0]]
			>(true)

			testType.equal<
				NumericStruct.FromNumeric<-9007199254740993n>,
				['bigint', ['-', [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 3], 0]]
			>(true)
		})

		it('casts 0n/-0n to ["bigint", ["+", [0], 0]]', () => {
			testType.equal<NumericStruct.FromNumeric<0n>, ['bigint', ['+', [0], 0]]>(true)
			testType.equal<NumericStruct.FromNumeric<-0n>, ['bigint', ['+', [0], 0]]>(true)
		})
	})

	describe(`number`, () => {
		it('casts positive number to ["number", ["+", Digits, Exponent]]', () => {
			testType.equal<NumericStruct.FromNumeric<1>, ['number', ['+', [1], 0]]>(true)

			testType.equal<
				NumericStruct.FromNumeric<1234567890>,
				['number', ['+', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 0]]
			>(true)

			testType.equal<
				NumericStruct.FromNumeric<9007199254740992>,
				['number', ['+', [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2], 0]]
			>(true)

			testType.equal<NumericStruct.FromNumeric<0.0>, ['number', ['+', [0], 0]]>(true)
			testType.equal<NumericStruct.FromNumeric<0.1>, ['number', ['+', [1], 1]]>(true)
			testType.equal<NumericStruct.FromNumeric<0.1>, ['number', ['+', [1], 1]]>(true)
			testType.equal<NumericStruct.FromNumeric<1.0>, ['number', ['+', [1], 0]]>(true)
			testType.equal<NumericStruct.FromNumeric<1.0>, ['number', ['+', [1], 0]]>(true)
			testType.equal<NumericStruct.FromNumeric<1.1>, ['number', ['+', [1, 1], 1]]>(true)
			testType.equal<NumericStruct.FromNumeric<1.1>, ['number', ['+', [1, 1], 1]]>(true)

			testType.equal<NumericStruct.FromNumeric<0.123>, ['number', ['+', [1, 2, 3], 3]]>(true)
			testType.equal<NumericStruct.FromNumeric<0.000123>, ['number', ['+', [1, 2, 3], 6]]>(true)
			testType.equal<NumericStruct.FromNumeric<123.45>, ['number', ['+', [1, 2, 3, 4, 5], 2]]>(true)
		})

		it('casts negative number to ["number", ["-", Digits, Exponent]]', () => {
			testType.equal<NumericStruct.FromNumeric<-1>, ['number', ['-', [1], 0]]>(true)

			testType.equal<
				NumericStruct.FromNumeric<-1234567890>,
				['number', ['-', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 0]]
			>(true)

			// MAX_NUMBER = 9007199254740992
			testType.equal<
				NumericStruct.FromNumeric<-9007199254740992>,
				['number', ['-', [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2], 0]]
			>(true)

			testType.equal<NumericStruct.FromNumeric<-0.0>, ['number', ['+', [0], 0]]>(true)
			testType.equal<NumericStruct.FromNumeric<-0.1>, ['number', ['-', [1], 1]]>(true)
			testType.equal<NumericStruct.FromNumeric<-0.1>, ['number', ['-', [1], 1]]>(true)
			testType.equal<NumericStruct.FromNumeric<-1.0>, ['number', ['-', [1], 0]]>(true)
			testType.equal<NumericStruct.FromNumeric<-1.0>, ['number', ['-', [1], 0]]>(true)
			testType.equal<NumericStruct.FromNumeric<-1.1>, ['number', ['-', [1, 1], 1]]>(true)
			testType.equal<NumericStruct.FromNumeric<-1.1>, ['number', ['-', [1, 1], 1]]>(true)

			testType.equal<NumericStruct.FromNumeric<-0.123>, ['number', ['-', [1, 2, 3], 3]]>(true)
			testType.equal<NumericStruct.FromNumeric<-0.000123>, ['number', ['-', [1, 2, 3], 6]]>(true)
			testType.equal<NumericStruct.FromNumeric<-123.45>, ['number', ['-', [1, 2, 3, 4, 5], 2]]>(true)
		})

		it('casts 0/-0 to ["number", ["+", [0], 0]]', () => {
			testType.equal<NumericStruct.FromNumeric<0>, ['number', ['+', [0], 0]]>(true)
			testType.equal<NumericStruct.FromNumeric<-0>, ['number', ['+', [0], 0]]>(true)
		})

		it('casts floating point numbers with correct exponent', () => {
			testType.equal<NumericStruct.FromNumeric<1.1>, ['number', ['+', [1, 1], 1]]>(true)
			testType.equal<NumericStruct.FromNumeric<1.2345>, ['number', ['+', [1, 2, 3, 4, 5], 4]]>(true)
			testType.equal<NumericStruct.FromNumeric<123.45>, ['number', ['+', [1, 2, 3, 4, 5], 2]]>(true)

			testType.equal<NumericStruct.FromNumeric<-1.1>, ['number', ['-', [1, 1], 1]]>(true)
			testType.equal<NumericStruct.FromNumeric<-1.2345>, ['number', ['-', [1, 2, 3, 4, 5], 4]]>(true)
			testType.equal<NumericStruct.FromNumeric<-123.45>, ['number', ['-', [1, 2, 3, 4, 5], 2]]>(true)
		})

		it('normalizes floating point numbers', () => {
			testType.equal<NumericStruct.FromNumeric<0.1>, ['number', ['+', [1], 1]]>(true)
			testType.equal<NumericStruct.FromNumeric<0.1357>, ['number', ['+', [1, 3, 5, 7], 4]]>(true)
			testType.equal<NumericStruct.FromNumeric<0.00123>, ['number', ['+', [1, 2, 3], 5]]>(true)
			testType.equal<NumericStruct.FromNumeric<0.009753>, ['number', ['+', [9, 7, 5, 3], 6]]>(true)

			testType.equal<NumericStruct.FromNumeric<-0.1>, ['number', ['-', [1], 1]]>(true)
			testType.equal<NumericStruct.FromNumeric<-0.00123>, ['number', ['-', [1, 2, 3], 5]]>(true)
		})
	})
})

describe(`NumericStruct.ToNumeric`, () => {
	it('converts bigint', () => {
		testType.equal<NumericStruct.ToNumeric<['bigint', ['+', [0], 0]]>, 0n>(true)
		testType.equal<NumericStruct.ToNumeric<['bigint', ['+', [1], 0]]>, 1n>(true)
		testType.equal<
			NumericStruct.ToNumeric<['bigint', ['+', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 0]]>,
			9876543210n
		>(true)

		testType.equal<NumericStruct.ToNumeric<['bigint', ['-', [0], 0]]>, 0n>(true)
		testType.equal<NumericStruct.ToNumeric<['bigint', ['-', [1], 0]]>, -1n>(true)
		testType.equal<
			NumericStruct.ToNumeric<['bigint', ['-', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 0]]>,
			-9876543210n
		>(true)
	})

	it('converts whole numbers', () => {
		testType.equal<NumericStruct.ToNumeric<['number', ['+', [0], 0]]>, 0>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['+', [1], 0]]>, 1>(true)
		testType.equal<
			NumericStruct.ToNumeric<['number', ['+', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 0]]>,
			9876543210
		>(true)
		testType.equal<
			NumericStruct.ToNumeric<
				['number', ['+', [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2], 0]]
			>,
			9007199254740992
		>(true)

		testType.equal<NumericStruct.ToNumeric<['number', ['-', [0], 0]]>, 0>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['-', [1], 0]]>, -1>(true)
		testType.equal<
			NumericStruct.ToNumeric<['number', ['-', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 0]]>,
			-9876543210
		>(true)
		testType.equal<
			NumericStruct.ToNumeric<
				['number', ['-', [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2], 0]]
			>,
			-9007199254740992
		>(true)
	})

	it('converts floating point numbers', () => {
		testType.equal<NumericStruct.ToNumeric<['number', ['+', [1], 1]]>, 0.1>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['+', [1, 2], 1]]>, 1.2>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['+', [1, 2, 3], 1]]>, 12.3>(true)

		testType.equal<NumericStruct.ToNumeric<['number', ['+', [1, 2, 3, 4, 5], 1]]>, 1234.5>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['+', [1, 2, 3, 4, 5], 2]]>, 123.45>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['+', [1, 2, 3, 4, 5], 3]]>, 12.345>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['+', [1, 2, 3, 4, 5], 4]]>, 1.2345>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['+', [1, 2, 3, 4, 5], 5]]>, 0.12345>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['+', [1, 2, 3, 4, 5], 6]]>, 0.012345>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['+', [1, 2, 3, 4, 5], 7]]>, 0.0012345>(true)

		testType.equal<NumericStruct.ToNumeric<['number', ['-', [1], 1]]>, -0.1>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['-', [1, 2], 1]]>, -1.2>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['-', [1, 2, 3], 1]]>, -12.3>(true)

		testType.equal<NumericStruct.ToNumeric<['number', ['-', [1, 2, 3, 4, 5], 1]]>, -1234.5>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['-', [1, 2, 3, 4, 5], 2]]>, -123.45>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['-', [1, 2, 3, 4, 5], 3]]>, -12.345>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['-', [1, 2, 3, 4, 5], 4]]>, -1.2345>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['-', [1, 2, 3, 4, 5], 5]]>, -0.12345>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['-', [1, 2, 3, 4, 5], 6]]>, -0.012345>(true)
		testType.equal<NumericStruct.ToNumeric<['number', ['-', [1, 2, 3, 4, 5], 7]]>, -0.0012345>(true)
	})

	it('converts bigint with floating point number to number', () => {
		testType.equal<NumericStruct.ToNumeric<['bigint', ['+', [1, 2, 3, 4, 5], 3]]>, 12.345>(true)
		testType.equal<NumericStruct.ToNumeric<['bigint', ['+', [1, 2], 4]]>, 0.0012>(true)

		testType.equal<NumericStruct.ToNumeric<['bigint', ['-', [1, 2, 3, 4, 5], 3]]>, -12.345>(true)
		testType.equal<NumericStruct.ToNumeric<['bigint', ['-', [1, 2], 4]]>, -0.0012>(true)
	})

	it('returns never for floating point number that is too large', () => {
		testType.never<
			NumericStruct.ToNumeric<
				['number', ['+', [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2, 1], 1]]
			>
		>(true)

		testType.never<
			NumericStruct.ToNumeric<
				['number', ['-', [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2, 1], 1]]
			>
		>(true)

		testType.never<
			NumericStruct.ToNumeric<
				['bigint', ['+', [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2, 1], 1]]
			>
		>(true)

		testType.never<
			NumericStruct.ToNumeric<
				['bigint', ['-', [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2, 1], 1]]
			>
		>(true)
	})

	it('convert number to bigint if the number is too large', () => {
		testType.equal<
			NumericStruct.ToNumeric<
				['number', ['+', [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 3], 0]]
			>,
			9007199254740993n
		>(true)

		testType.equal<
			NumericStruct.ToNumeric<
				['number', ['-', [9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 3], 0]]
			>,
			-9007199254740993n
		>(true)
	})
})

describe('conversion roundtrip', () => {
	type RoundTrip<N extends number | bigint> = NumericStruct.ToNumeric<NumericStruct.FromNumeric<N>>

	it(`keep widen type?`, () => {
		// @ts-expect-error
		testType.equal<RoundTrip<number>, number>(true)
		// @ts-expect-error
		testType.equal<RoundTrip<bigint>, bigint>(true)
	})

	it('round trip for number', () => {
		testType.equal<RoundTrip<0>, 0>(true)
		testType.equal<RoundTrip<-0>, 0>(true)

		testType.equal<RoundTrip<1>, 1>(true)
		testType.equal<RoundTrip<1234567890>, 1234567890>(true)
		testType.equal<RoundTrip<-1>, -1>(true)
		testType.equal<RoundTrip<-1234567890>, -1234567890>(true)

		testType.equal<RoundTrip<1.234>, 1.234>(true)
		testType.equal<RoundTrip<12.34>, 12.34>(true)
		testType.equal<RoundTrip<0.1234>, 0.1234>(true)
		testType.equal<RoundTrip<0.001234>, 0.001234>(true)

		testType.equal<RoundTrip<-1.234>, -1.234>(true)
		testType.equal<RoundTrip<-12.34>, -12.34>(true)
		testType.equal<RoundTrip<-0.1234>, -0.1234>(true)
		testType.equal<RoundTrip<-0.001234>, -0.001234>(true)
	})

	it('round trip for bigint', () => {
		testType.equal<RoundTrip<0n>, 0n>(true)
		testType.equal<RoundTrip<-0n>, 0n>(true)

		testType.equal<RoundTrip<1n>, 1n>(true)
		testType.equal<RoundTrip<1234567890n>, 1234567890n>(true)
		testType.equal<RoundTrip<-1n>, -1n>(true)
		testType.equal<RoundTrip<-1234567890n>, -1234567890n>(true)
	})
})

import { describe, it } from '@jest/globals'
import { testType } from '../index.js'
import {
	AddNormalizedNumberStruct,
	BigintToMathStruct,
	GetMinPadEnd,
	NormalizedMathStructToNumeric,
	NumberToMathStruct,
	NumericToMathStruct
} from './math_struct.js'

describe('BigintToMathStruct', () => {
	it('casts positive bigint to ["bigint", "+", NumberStruct]', () => {
		testType.equal<BigintToMathStruct<1n>, ['bigint', '+', [[1], 0, 0]]>(true)

		testType.equal<BigintToMathStruct<1234567890n>, ['bigint', '+', [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 0, 0]]>(
			true
		)

		testType.equal<
			BigintToMathStruct<9007199254740993n>,
			['bigint', '+', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 3], 0, 0]]
		>(true)
	})

	it('casts negative bigint to ["bigint", "-", NumberStruct]', () => {
		testType.equal<BigintToMathStruct<-1n>, ['bigint', '-', [[1], 0, 0]]>(true)

		testType.equal<BigintToMathStruct<-1234567890n>, ['bigint', '-', [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 0, 0]]>(
			true
		)

		testType.equal<
			BigintToMathStruct<-9007199254740993n>,
			['bigint', '-', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 3], 0, 0]]
		>(true)
	})

	it('casts 0n to ["bigint", "+", [[0], 0]]', () => {
		testType.equal<BigintToMathStruct<0n>, ['bigint', '+', [[0], 0, 0]]>(true)
		testType.equal<BigintToMathStruct<-0n>, ['bigint', '+', [[0], 0, 0]]>(true)
	})
})

describe(`NumberToMathStruct`, () => {
	it('casts positive number to ["number", "+", NumberStruct]', () => {
		testType.equal<NumberToMathStruct<1>, ['number', '+', [[1], 0, 0]]>(true)

		testType.equal<NumberToMathStruct<1234567890>, ['number', '+', [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 0, 0]]>(
			true
		)

		testType.equal<
			NumberToMathStruct<9007199254740992>,
			['number', '+', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2], 0, 0]]
		>(true)

		testType.equal<NumberToMathStruct<0.0>, ['number', '+', [[0], 0, 0]]>(true)
		testType.equal<NumberToMathStruct<0.1>, ['number', '+', [[0, 1], 1, 1]]>(true)
		testType.equal<NumberToMathStruct<0.1>, ['number', '+', [[0, 1], 1, 1]]>(true)
		testType.equal<NumberToMathStruct<1.0>, ['number', '+', [[1], 0, 0]]>(true)
		testType.equal<NumberToMathStruct<1.0>, ['number', '+', [[1], 0, 0]]>(true)
		testType.equal<NumberToMathStruct<1.1>, ['number', '+', [[1, 1], 1, 0]]>(true)
		testType.equal<NumberToMathStruct<1.1>, ['number', '+', [[1, 1], 1, 0]]>(true)

		testType.equal<NumberToMathStruct<0.123>, ['number', '+', [[0, 1, 2, 3], 3, 1]]>(true)
		testType.equal<NumberToMathStruct<0.000123>, ['number', '+', [[0, 0, 0, 0, 1, 2, 3], 6, 4]]>(true)
		testType.equal<NumberToMathStruct<123.45>, ['number', '+', [[1, 2, 3, 4, 5], 2, 0]]>(true)
	})

	it('casts negative number to ["number", "-", NumberStruct]', () => {
		testType.equal<NumberToMathStruct<-1>, ['number', '-', [[1], 0, 0]]>(true)

		testType.equal<NumberToMathStruct<-1234567890>, ['number', '-', [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 0, 0]]>(
			true
		)

		// MAX_NUMBER = 9007199254740992
		testType.equal<
			NumberToMathStruct<-9007199254740992>,
			['number', '-', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2], 0, 0]]
		>(true)

		testType.equal<NumberToMathStruct<-0.0>, ['number', '+', [[0], 0, 0]]>(true)
		testType.equal<NumberToMathStruct<-0.1>, ['number', '-', [[0, 1], 1, 1]]>(true)
		testType.equal<NumberToMathStruct<-0.1>, ['number', '-', [[0, 1], 1, 1]]>(true)
		testType.equal<NumberToMathStruct<-1.0>, ['number', '-', [[1], 0, 0]]>(true)
		testType.equal<NumberToMathStruct<-1.0>, ['number', '-', [[1], 0, 0]]>(true)
		testType.equal<NumberToMathStruct<-1.1>, ['number', '-', [[1, 1], 1, 0]]>(true)
		testType.equal<NumberToMathStruct<-1.1>, ['number', '-', [[1, 1], 1, 0]]>(true)

		testType.equal<NumberToMathStruct<-0.123>, ['number', '-', [[0, 1, 2, 3], 3, 1]]>(true)
		testType.equal<NumberToMathStruct<-0.000123>, ['number', '-', [[0, 0, 0, 0, 1, 2, 3], 6, 4]]>(true)
		testType.equal<NumberToMathStruct<-123.45>, ['number', '-', [[1, 2, 3, 4, 5], 2, 0]]>(true)
	})

	it('casts 0n to ["number", "+", [[0], 0, 0]]', () => {
		testType.equal<NumberToMathStruct<0>, ['number', '+', [[0], 0, 0]]>(true)
		testType.equal<NumberToMathStruct<-0>, ['number', '+', [[0], 0, 0]]>(true)
	})

	it('casts floating point numbers with correct exponent', () => {
		testType.equal<NumberToMathStruct<1.1>, ['number', '+', [[1, 1], 1, 0]]>(true)
		testType.equal<NumberToMathStruct<1.2345>, ['number', '+', [[1, 2, 3, 4, 5], 4, 0]]>(true)
		testType.equal<NumberToMathStruct<123.45>, ['number', '+', [[1, 2, 3, 4, 5], 2, 0]]>(true)

		testType.equal<NumberToMathStruct<-1.1>, ['number', '-', [[1, 1], 1, 0]]>(true)
		testType.equal<NumberToMathStruct<-1.2345>, ['number', '-', [[1, 2, 3, 4, 5], 4, 0]]>(true)
		testType.equal<NumberToMathStruct<-123.45>, ['number', '-', [[1, 2, 3, 4, 5], 2, 0]]>(true)
	})

	it('normalizes floating point numbers', () => {
		testType.equal<NumberToMathStruct<0.1>, ['number', '+', [[0, 1], 1, 1]]>(true)
		testType.equal<NumberToMathStruct<0.00123>, ['number', '+', [[0, 0, 0, 1, 2, 3], 5, 3]]>(true)

		testType.equal<NumberToMathStruct<-0.1>, ['number', '-', [[0, 1], 1, 1]]>(true)
		testType.equal<NumberToMathStruct<-0.00123>, ['number', '-', [[0, 0, 0, 1, 2, 3], 5, 3]]>(true)
	})
})

describe(`NormalizedMathStructToNumeric`, () => {
	it('converts bigint', () => {
		testType.equal<NormalizedMathStructToNumeric<['bigint', '+', [[0], 0, 0]]>, 0n>(true)
		testType.equal<NormalizedMathStructToNumeric<['bigint', '+', [[1], 0, 0]]>, 1n>(true)
		testType.equal<
			NormalizedMathStructToNumeric<['bigint', '+', [[9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 0, 0]]>,
			9876543210n
		>(true)

		testType.equal<NormalizedMathStructToNumeric<['bigint', '-', [[0], 0, 0]]>, 0n>(true)
		testType.equal<NormalizedMathStructToNumeric<['bigint', '-', [[1], 0, 0]]>, -1n>(true)
		testType.equal<
			NormalizedMathStructToNumeric<['bigint', '-', [[9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 0, 0]]>,
			-9876543210n
		>(true)
	})

	it('converts whole numbers', () => {
		testType.equal<NormalizedMathStructToNumeric<['number', '+', [[0], 0, 0]]>, 0>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '+', [[1], 0, 0]]>, 1>(true)
		testType.equal<
			NormalizedMathStructToNumeric<['number', '+', [[9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 0, 0]]>,
			9876543210
		>(true)
		testType.equal<
			NormalizedMathStructToNumeric<
				['number', '+', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2], 0, 0]]
			>,
			9007199254740992
		>(true)

		testType.equal<NormalizedMathStructToNumeric<['number', '-', [[0], 0, 0]]>, 0>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '-', [[1], 0, 0]]>, -1>(true)
		testType.equal<
			NormalizedMathStructToNumeric<['number', '-', [[9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 0, 0]]>,
			-9876543210
		>(true)
		testType.equal<
			NormalizedMathStructToNumeric<
				['number', '-', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2], 0, 0]]
			>,
			-9007199254740992
		>(true)
	})

	it('converts floating point numbers', () => {
		testType.equal<NormalizedMathStructToNumeric<['number', '+', [[1], 1, 0]]>, 0.1>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '+', [[1, 2], 1, 0]]>, 1.2>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '+', [[1, 2, 3], 1, 0]]>, 12.3>(true)

		testType.equal<NormalizedMathStructToNumeric<['number', '+', [[1, 2, 3, 4, 5], 1, 0]]>, 1234.5>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '+', [[1, 2, 3, 4, 5], 2, 0]]>, 123.45>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '+', [[1, 2, 3, 4, 5], 3, 0]]>, 12.345>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '+', [[1, 2, 3, 4, 5], 4, 0]]>, 1.2345>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '+', [[1, 2, 3, 4, 5], 5, 0]]>, 0.12345>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '+', [[1, 2, 3, 4, 5], 6, 0]]>, 0.012345>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '+', [[1, 2, 3, 4, 5], 7, 0]]>, 0.0012345>(true)

		testType.equal<NormalizedMathStructToNumeric<['number', '-', [[1], 1, 0]]>, -0.1>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '-', [[1, 2], 1, 0]]>, -1.2>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '-', [[1, 2, 3], 1, 0]]>, -12.3>(true)

		testType.equal<NormalizedMathStructToNumeric<['number', '-', [[1, 2, 3, 4, 5], 1, 0]]>, -1234.5>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '-', [[1, 2, 3, 4, 5], 2, 0]]>, -123.45>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '-', [[1, 2, 3, 4, 5], 3, 0]]>, -12.345>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '-', [[1, 2, 3, 4, 5], 4, 0]]>, -1.2345>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '-', [[1, 2, 3, 4, 5], 5, 0]]>, -0.12345>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '-', [[1, 2, 3, 4, 5], 6, 0]]>, -0.012345>(true)
		testType.equal<NormalizedMathStructToNumeric<['number', '-', [[1, 2, 3, 4, 5], 7, 0]]>, -0.0012345>(true)
	})

	it('converts bigint with floating point number to number', () => {
		testType.equal<NormalizedMathStructToNumeric<['bigint', '+', [[1, 2, 3, 4, 5], 3, 0]]>, 12.345>(true)
		testType.equal<NormalizedMathStructToNumeric<['bigint', '+', [[1, 2], 4, 0]]>, 0.0012>(true)

		testType.equal<NormalizedMathStructToNumeric<['bigint', '-', [[1, 2, 3, 4, 5], 3, 0]]>, -12.345>(true)
		testType.equal<NormalizedMathStructToNumeric<['bigint', '-', [[1, 2], 4, 0]]>, -0.0012>(true)
	})

	it('returns never for floating point number that is too large', () => {
		testType.never<
			NormalizedMathStructToNumeric<
				['number', '+', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2, 1], 1, 0]]
			>
		>(true)

		testType.never<
			NormalizedMathStructToNumeric<
				['number', '-', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2, 1], 1, 0]]
			>
		>(true)

		testType.never<
			NormalizedMathStructToNumeric<
				['bigint', '+', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2, 1], 1, 0]]
			>
		>(true)

		testType.never<
			NormalizedMathStructToNumeric<
				['bigint', '-', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2, 1], 1, 0]]
			>
		>(true)
	})

	it('convert number to bigint if the number is too large', () => {
		testType.equal<
			NormalizedMathStructToNumeric<
				['number', '+', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 3], 0, 0]]
			>,
			9007199254740993n
		>(true)

		testType.equal<
			NormalizedMathStructToNumeric<
				['number', '-', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 3], 0, 0]]
			>,
			-9007199254740993n
		>(true)
	})
})

describe('conversion roundtrip', () => {
	type RoundTrip<N extends number | bigint> = NormalizedMathStructToNumeric<NumericToMathStruct<N>>

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

describe('GetMinPadEnd', () => {
	it('returns [0, M] if one of the value is 0', () => {
		testType.equal<GetMinPadEnd<0, 1>, [[], 'B']>(true)
		testType.equal<GetMinPadEnd<2, 0>, [[], 'A']>(true)
	})

	it('returns [[0...n], M]', () => {
		testType.equal<GetMinPadEnd<4, 1>, [[0], 'A']>(true)
		testType.equal<GetMinPadEnd<3, 7>, [[0, 0, 0], 'B']>(true)
	})
})

describe('AddNormalizedNumberStruct', () => {
	it('0 + 0', () => {
		testType.equal<AddNormalizedNumberStruct<[[0], 0, 0], [[0], 0, 0]>, [[0], 0, 0]>(true)
	})
})

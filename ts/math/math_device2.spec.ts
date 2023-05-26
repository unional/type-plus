import { describe, it } from '@jest/globals'
import { testType } from '../index.js'
import { BigintToMathStruct, NormalizedMathStructToNumeric, NumberToMathStruct } from './math_device2.js'

describe('BigintToMathDevice', () => {
	it('casts positive bigint to ["bigint", "+", NumberStruct]', () => {
		testType.equal<BigintToMathStruct<1n>, ['bigint', '+', [[1], 0]]>(true)

		testType.equal<BigintToMathStruct<1234567890n>, ['bigint', '+', [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 0]]>(
			true
		)

		testType.equal<
			BigintToMathStruct<9007199254740993n>,
			['bigint', '+', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 3], 0]]
		>(true)
	})

	it('casts negative bigint to ["bigint", "-", NumberStruct]', () => {
		testType.equal<BigintToMathStruct<-1n>, ['bigint', '-', [[1], 0]]>(true)

		testType.equal<BigintToMathStruct<-1234567890n>, ['bigint', '-', [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 0]]>(
			true
		)

		testType.equal<
			BigintToMathStruct<-9007199254740993n>,
			['bigint', '-', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 3], 0]]
		>(true)
	})

	it('casts 0n to ["bigint", "+", [[0], 0]]', () => {
		testType.equal<BigintToMathStruct<0n>, ['bigint', '+', [[0], 0]]>(true)
		testType.equal<BigintToMathStruct<-0n>, ['bigint', '+', [[0], 0]]>(true)
	})
})

describe(`NumberToMathDevice`, () => {
	it('casts positive number to ["number", "+", NumberStruct]', () => {
		testType.equal<NumberToMathStruct<1>, ['number', '+', [[1], 0]]>(true)

		testType.equal<NumberToMathStruct<1234567890>, ['number', '+', [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 0]]>(true)

		testType.equal<
			NumberToMathStruct<9007199254740992>,
			['number', '+', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2], 0]]
		>(true)
	})

	it('casts negative number to ["number", "-", NumberStruct]', () => {
		testType.equal<NumberToMathStruct<-1>, ['number', '-', [[1], 0]]>(true)

		testType.equal<NumberToMathStruct<-1234567890>, ['number', '-', [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 0]]>(
			true
		)

		// MAX_NUMBER = 9007199254740992
		testType.equal<
			NumberToMathStruct<-9007199254740992>,
			['number', '-', [[9, 0, 0, 7, 1, 9, 9, 2, 5, 4, 7, 4, 0, 9, 9, 2], 0]]
		>(true)
	})

	it('casts 0n to ["number", "+", [[0], 0]]', () => {
		testType.equal<NumberToMathStruct<0>, ['number', '+', [[0], 0]]>(true)
		testType.equal<NumberToMathStruct<-0>, ['number', '+', [[0], 0]]>(true)
	})

	it('casts floating point numbers with correct exponent', () => {
		testType.equal<NumberToMathStruct<1.1>, ['number', '+', [[1, 1], 1]]>(true)
		testType.equal<NumberToMathStruct<1.2345>, ['number', '+', [[1, 2, 3, 4, 5], 4]]>(true)

		testType.equal<NumberToMathStruct<123.45>, ['number', '+', [[1, 2, 3, 4, 5], 2]]>(true)
	})

	it('normalizes floating point numbers', () => {
		testType.equal<NumberToMathStruct<0.1>, ['number', '+', [[1], 1]]>(true)
		testType.equal<NumberToMathStruct<0.00123>, ['number', '+', [[1, 2, 3], 5]]>(true)
	})
})

describe(`MathDeviceToNumeric`, () => {
	it('converts bigint', () => {
		testType.equal<NormalizedMathStructToNumeric<['bigint', '+', [[0], 0]]>, 0n>(true)
		testType.equal<NormalizedMathStructToNumeric<['bigint', '+', [[1], 0]]>, 1n>(true)
		testType.equal<
			NormalizedMathStructToNumeric<['bigint', '+', [[9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 0]]>,
			9876543210n
		>(true)

		testType.equal<NormalizedMathStructToNumeric<['bigint', '-', [[0], 0]]>, 0n>(true)
		testType.equal<NormalizedMathStructToNumeric<['bigint', '-', [[1], 0]]>, -1n>(true)
		testType.equal<
			NormalizedMathStructToNumeric<['bigint', '-', [[9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 0]]>,
			-9876543210n
		>(true)
	})
})

import { it } from '@jest/globals'
import { testType } from '../index.js'
import { type StringToMathDevice } from './cast.js'

it('casts negative bigint to ["bigint", "-", Significand]', () => {
	testType.equal<StringToMathDevice<'-1n'>, ['bigint', '-', [1]]>(true)
	testType.equal<StringToMathDevice<'-1234567890n'>, ['bigint', '-', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]]>(true)
})

it('casts positive bigint to ["bigint", "+", Significand]', () => {
	testType.equal<StringToMathDevice<'1n'>, ['bigint', '+', [1]]>(true)
	testType.equal<StringToMathDevice<'1234567890n'>, ['bigint', '+', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]]>(true)
})

it('casts negative number to ["number", "-", Significand, -Exponent]', () => {
	testType.equal<StringToMathDevice<'-1'>, ['number', '-', [1], 0]>(true)
	testType.equal<StringToMathDevice<'-1234567890'>, ['number', '-', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 0]>(true)

	testType.equal<StringToMathDevice<'-0.0'>, ['number', '-', [0], 0]>(true)
	testType.equal<StringToMathDevice<'-0.1000'>, ['number', '-', [0, 1], 1]>(true)
	testType.equal<StringToMathDevice<'-0.1'>, ['number', '-', [0, 1], 1]>(true)
	testType.equal<StringToMathDevice<'-1.0000'>, ['number', '-', [1], 0]>(true)
	testType.equal<StringToMathDevice<'-1.0'>, ['number', '-', [1], 0]>(true)
	testType.equal<StringToMathDevice<'-1.10000'>, ['number', '-', [1, 1], 1]>(true)
	testType.equal<StringToMathDevice<'-1.1'>, ['number', '-', [1, 1], 1]>(true)

	testType.equal<StringToMathDevice<'-0.123'>, ['number', '-', [0, 1, 2, 3], 3]>(true)
	testType.equal<StringToMathDevice<'-123.45'>, ['number', '-', [1, 2, 3, 4, 5], 2]>(true)
})

it('casts positive number to ["number", "+", Significand, -Exponent]', () => {
	testType.equal<StringToMathDevice<'1'>, ['number', '+', [1], 0]>(true)
	testType.equal<StringToMathDevice<'1234567890'>, ['number', '+', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 0]>(true)

	testType.equal<StringToMathDevice<'0.0'>, ['number', '+', [0], 0]>(true)
	testType.equal<StringToMathDevice<'0.1000'>, ['number', '+', [0, 1], 1]>(true)
	testType.equal<StringToMathDevice<'0.1'>, ['number', '+', [0, 1], 1]>(true)
	testType.equal<StringToMathDevice<'1.0000'>, ['number', '+', [1], 0]>(true)
	testType.equal<StringToMathDevice<'1.0'>, ['number', '+', [1], 0]>(true)
	testType.equal<StringToMathDevice<'1.10000'>, ['number', '+', [1, 1], 1]>(true)
	testType.equal<StringToMathDevice<'1.1'>, ['number', '+', [1, 1], 1]>(true)

	testType.equal<StringToMathDevice<'0.123'>, ['number', '+', [0, 1, 2, 3], 3]>(true)
	testType.equal<StringToMathDevice<'123.45'>, ['number', '+', [1, 2, 3, 4, 5], 2]>(true)
})

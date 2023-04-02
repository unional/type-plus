import { testType } from '../index.js'
import type { Digit, DigitArray } from './Digit.js'

describe('DigitArray.ToNumber<DA>', () => {
	test('no digit gets 0', () => {
		type A = DigitArray.ToNumber<[]>
		testType.equal<A, 0>(true)
	})

	test('single digit', () => {
		testType.equal<DigitArray.ToNumber<[0]>, 0>(true)
		testType.equal<DigitArray.ToNumber<[1]>, 1>(true)
		testType.equal<DigitArray.ToNumber<[2]>, 2>(true)
		testType.equal<DigitArray.ToNumber<[3]>, 3>(true)
		testType.equal<DigitArray.ToNumber<[4]>, 4>(true)
		testType.equal<DigitArray.ToNumber<[5]>, 5>(true)
		testType.equal<DigitArray.ToNumber<[6]>, 6>(true)
		testType.equal<DigitArray.ToNumber<[7]>, 7>(true)
		testType.equal<DigitArray.ToNumber<[8]>, 8>(true)
		testType.equal<DigitArray.ToNumber<[9]>, 9>(true)
	})

	test('two digits', () => {
		testType.equal<DigitArray.ToNumber<[1, 0]>, 10>(true)
		testType.equal<DigitArray.ToNumber<[1, 0]>, 10>(true)
		testType.equal<DigitArray.ToNumber<[3, 1]>, 31>(true)
		testType.equal<DigitArray.ToNumber<[13, 1]>, 131>(true)
		testType.equal<DigitArray.ToNumber<[1, 2, 3, 4]>, 1234>(true)
	})

	test('multi digits', () => {
		testType.equal<DigitArray.ToNumber<[1, 2, 3, 4]>, 1234>(true)
		testType.equal<DigitArray.ToNumber<[1, 2, 3, 5]>, 1235>(true)
	})
})

describe('DigitArray.Shift10<DA>', () => {
	test('zero digit gets the same', () => {
		testType.equal<DigitArray.Shift10<[]>, []>(true)
	})

	test('single digit gets the same', () => {
		testType.equal<DigitArray.Shift10<[5]>, [5]>(true)
	})

	test('two digits with leading 0 get trimmed', () => {
		testType.equal<DigitArray.Shift10<[0, 5]>, [5]>(true)
	})
	test('two digits gets value shifted', () => {
		testType.equal<DigitArray.Shift10<[1, 5]>, [15]>(true)
		testType.equal<DigitArray.Shift10<[9, 0]>, [8, 10]>(true)
		testType.equal<DigitArray.Shift10<[9, 9]>, [8, 19]>(true)
	})
	test('multiple digits', () => {
		testType.equal<DigitArray.Shift10<[0, 1, 2, 3, 4]>, [11, 12, 14]>(true)
	})
})

describe('Digit.GreaterThan<A, B>', () => {
	test('n > n is false', () => {
		testType.false<Digit.GreaterThan<0, 0>>(true)
		testType.false<Digit.GreaterThan<1, 1>>(true)
		testType.false<Digit.GreaterThan<2, 2>>(true)
		testType.false<Digit.GreaterThan<3, 3>>(true)
		testType.false<Digit.GreaterThan<4, 4>>(true)
		testType.false<Digit.GreaterThan<5, 5>>(true)
		testType.false<Digit.GreaterThan<6, 6>>(true)
		testType.false<Digit.GreaterThan<7, 7>>(true)
		testType.false<Digit.GreaterThan<8, 8>>(true)
		testType.false<Digit.GreaterThan<9, 9>>(true)
	})
	test('N > m is true', () => {
		testType.true<Digit.GreaterThan<1, 0>>(true)
		testType.true<Digit.GreaterThan<2, 0>>(true)
		testType.true<Digit.GreaterThan<3, 0>>(true)
		testType.true<Digit.GreaterThan<4, 0>>(true)
		testType.true<Digit.GreaterThan<5, 0>>(true)
		testType.true<Digit.GreaterThan<6, 0>>(true)
		testType.true<Digit.GreaterThan<7, 0>>(true)
		testType.true<Digit.GreaterThan<8, 0>>(true)
		testType.true<Digit.GreaterThan<9, 0>>(true)

		testType.true<Digit.GreaterThan<2, 1>>(true)
		testType.true<Digit.GreaterThan<3, 1>>(true)
		testType.true<Digit.GreaterThan<4, 1>>(true)
		testType.true<Digit.GreaterThan<5, 1>>(true)
		testType.true<Digit.GreaterThan<6, 1>>(true)
		testType.true<Digit.GreaterThan<7, 1>>(true)
		testType.true<Digit.GreaterThan<8, 1>>(true)
		testType.true<Digit.GreaterThan<9, 1>>(true)

		testType.true<Digit.GreaterThan<3, 2>>(true)
		testType.true<Digit.GreaterThan<4, 2>>(true)
		testType.true<Digit.GreaterThan<5, 2>>(true)
		testType.true<Digit.GreaterThan<6, 2>>(true)
		testType.true<Digit.GreaterThan<7, 2>>(true)
		testType.true<Digit.GreaterThan<8, 2>>(true)
		testType.true<Digit.GreaterThan<9, 2>>(true)

		testType.true<Digit.GreaterThan<4, 3>>(true)
		testType.true<Digit.GreaterThan<5, 3>>(true)
		testType.true<Digit.GreaterThan<6, 3>>(true)
		testType.true<Digit.GreaterThan<7, 3>>(true)
		testType.true<Digit.GreaterThan<8, 3>>(true)
		testType.true<Digit.GreaterThan<9, 3>>(true)

		testType.true<Digit.GreaterThan<5, 4>>(true)
		testType.true<Digit.GreaterThan<6, 4>>(true)
		testType.true<Digit.GreaterThan<7, 4>>(true)
		testType.true<Digit.GreaterThan<8, 4>>(true)
		testType.true<Digit.GreaterThan<9, 4>>(true)

		testType.true<Digit.GreaterThan<6, 5>>(true)
		testType.true<Digit.GreaterThan<7, 5>>(true)
		testType.true<Digit.GreaterThan<8, 5>>(true)
		testType.true<Digit.GreaterThan<9, 5>>(true)

		testType.true<Digit.GreaterThan<7, 6>>(true)
		testType.true<Digit.GreaterThan<8, 6>>(true)
		testType.true<Digit.GreaterThan<9, 6>>(true)

		testType.true<Digit.GreaterThan<8, 7>>(true)
		testType.true<Digit.GreaterThan<9, 7>>(true)

		testType.true<Digit.GreaterThan<9, 8>>(true)
	})

	test('n > M is false', () => {
		testType.false<Digit.GreaterThan<0, 1>>(true)
		testType.false<Digit.GreaterThan<0, 2>>(true)
		testType.false<Digit.GreaterThan<0, 3>>(true)
		testType.false<Digit.GreaterThan<0, 4>>(true)
		testType.false<Digit.GreaterThan<0, 5>>(true)
		testType.false<Digit.GreaterThan<0, 6>>(true)
		testType.false<Digit.GreaterThan<0, 7>>(true)
		testType.false<Digit.GreaterThan<0, 8>>(true)
		testType.false<Digit.GreaterThan<0, 9>>(true)

		testType.false<Digit.GreaterThan<1, 2>>(true)
		testType.false<Digit.GreaterThan<1, 3>>(true)
		testType.false<Digit.GreaterThan<1, 4>>(true)
		testType.false<Digit.GreaterThan<1, 5>>(true)
		testType.false<Digit.GreaterThan<1, 6>>(true)
		testType.false<Digit.GreaterThan<1, 7>>(true)
		testType.false<Digit.GreaterThan<1, 8>>(true)
		testType.false<Digit.GreaterThan<1, 9>>(true)

		testType.false<Digit.GreaterThan<2, 3>>(true)
		testType.false<Digit.GreaterThan<2, 4>>(true)
		testType.false<Digit.GreaterThan<2, 5>>(true)
		testType.false<Digit.GreaterThan<2, 6>>(true)
		testType.false<Digit.GreaterThan<2, 7>>(true)
		testType.false<Digit.GreaterThan<2, 8>>(true)
		testType.false<Digit.GreaterThan<2, 9>>(true)

		testType.false<Digit.GreaterThan<3, 4>>(true)
		testType.false<Digit.GreaterThan<3, 5>>(true)
		testType.false<Digit.GreaterThan<3, 6>>(true)
		testType.false<Digit.GreaterThan<3, 7>>(true)
		testType.false<Digit.GreaterThan<3, 8>>(true)
		testType.false<Digit.GreaterThan<3, 9>>(true)

		testType.false<Digit.GreaterThan<4, 5>>(true)
		testType.false<Digit.GreaterThan<4, 6>>(true)
		testType.false<Digit.GreaterThan<4, 7>>(true)
		testType.false<Digit.GreaterThan<4, 8>>(true)
		testType.false<Digit.GreaterThan<4, 9>>(true)

		testType.false<Digit.GreaterThan<5, 6>>(true)
		testType.false<Digit.GreaterThan<5, 7>>(true)
		testType.false<Digit.GreaterThan<5, 8>>(true)
		testType.false<Digit.GreaterThan<5, 9>>(true)

		testType.false<Digit.GreaterThan<6, 7>>(true)
		testType.false<Digit.GreaterThan<6, 8>>(true)
		testType.false<Digit.GreaterThan<6, 9>>(true)

		testType.false<Digit.GreaterThan<7, 8>>(true)
		testType.false<Digit.GreaterThan<7, 9>>(true)

		testType.false<Digit.GreaterThan<8, 9>>(true)
	})
})

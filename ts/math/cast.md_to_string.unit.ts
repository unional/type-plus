import { it } from '@jest/globals'
import { testType } from '../index.js'
import type { MathDeviceToNumeric } from './cast.js'

it('converts bigint', () => {
	testType.equal<MathDeviceToNumeric<['bigint', '+', [0]]>, 0n>(true)
	testType.equal<MathDeviceToNumeric<['bigint', '+', [1]]>, 1n>(true)
	testType.equal<MathDeviceToNumeric<['bigint', '+', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]]>, 9876543210n>(true)

	testType.equal<MathDeviceToNumeric<['bigint', '-', [0]]>, 0n>(true)
	testType.equal<MathDeviceToNumeric<['bigint', '-', [1]]>, -1n>(true)
	testType.equal<MathDeviceToNumeric<['bigint', '-', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]]>, -9876543210n>(true)
})

it('converts numbers with empty fractional part', () => {
	testType.equal<MathDeviceToNumeric<['number', '+', [0], []]>, 0>(true)
	testType.equal<MathDeviceToNumeric<['number', '+', [1], []]>, 1>(true)
	testType.equal<MathDeviceToNumeric<['number', '+', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], []]>, 9876543210>(true)

	testType.equal<MathDeviceToNumeric<['number', '-', [1], []]>, -1>(true)
	testType.equal<MathDeviceToNumeric<['number', '-', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], []]>, -9876543210>(true)
})

it('converts numbers with fractional part', () => {
	testType.equal<MathDeviceToNumeric<['number', '+', [1, 2, 3, 4], [5]]>, 1234.5>(true)
	testType.equal<MathDeviceToNumeric<['number', '+', [1, 2, 3], [4, 5]]>, 123.45>(true)
	testType.equal<MathDeviceToNumeric<['number', '+', [1, 2], [3, 4, 5]]>, 12.345>(true)
	testType.equal<MathDeviceToNumeric<['number', '+', [1], [2, 3, 4, 5]]>, 1.2345>(true)
	testType.equal<MathDeviceToNumeric<['number', '+', [0], [1, 2, 3, 4, 5]]>, 0.12345>(true)

	testType.equal<MathDeviceToNumeric<['number', '-', [1, 2, 3, 4], [5]]>, -1234.5>(true)
	testType.equal<MathDeviceToNumeric<['number', '-', [1, 2, 3], [4, 5]]>, -123.45>(true)
	testType.equal<MathDeviceToNumeric<['number', '-', [1, 2], [3, 4, 5]]>, -12.345>(true)
	testType.equal<MathDeviceToNumeric<['number', '-', [1], [2, 3, 4, 5]]>, -1.2345>(true)
	testType.equal<MathDeviceToNumeric<['number', '-', [0], [1, 2, 3, 4, 5]]>, -0.12345>(true)
	testType.equal<MathDeviceToNumeric<['number', '-', [0], [0, 0, 0, 1, 2, 3]]>, -0.000123>(true)
})

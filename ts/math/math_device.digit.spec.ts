import { it } from '@jest/globals'
import { testType } from '../index.js'
import type { MathDevice } from './math_device.js'

it('adds single digit', () => {
	testType.equal<MathDevice.IntegerEntryAdd<0, 0>, 0>(true)
	testType.equal<MathDevice.IntegerEntryAdd<0, 1>, 1>(true)
	testType.equal<MathDevice.IntegerEntryAdd<0, 9>, 9>(true)
	testType.equal<MathDevice.IntegerEntryAdd<1, 0>, 1>(true)
	testType.equal<MathDevice.IntegerEntryAdd<1, 9>, 10>(true)
	testType.equal<MathDevice.IntegerEntryAdd<9, 9>, 18>(true)
})

it('subtracts single digit', () => {
	testType.equal<MathDevice.PositiveEntrySubtract<0, 0>, 0>(true)
	testType.equal<MathDevice.PositiveEntrySubtract<0, 1>, -1>(true)
	testType.equal<MathDevice.PositiveEntrySubtract<0, 9>, -9>(true)
	testType.equal<MathDevice.PositiveEntrySubtract<1, 0>, 1>(true)
	testType.equal<MathDevice.PositiveEntrySubtract<1, 9>, -8>(true)
	testType.equal<MathDevice.PositiveEntrySubtract<9, 9>, 0>(true)
})

it('multiply single digit', () => {
	testType.equal<MathDevice.DigitMultiply<0, 0>, 0>(true)
	testType.equal<MathDevice.DigitMultiply<0, 1>, 0>(true)
	testType.equal<MathDevice.DigitMultiply<0, 9>, 0>(true)

	testType.equal<MathDevice.DigitMultiply<1, 0>, 0>(true)
	testType.equal<MathDevice.DigitMultiply<1, 1>, 1>(true)
	testType.equal<MathDevice.DigitMultiply<1, 9>, 9>(true)

	testType.equal<MathDevice.DigitMultiply<9, 0>, 0>(true)
	testType.equal<MathDevice.DigitMultiply<9, 1>, 9>(true)
	testType.equal<MathDevice.DigitMultiply<9, 9>, 81>(true)
})

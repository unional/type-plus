import { it } from '@jest/globals'
import type { MathDevice } from './math_device.js'
import { testType } from '../testing/test_type.js'

it('returns single single-digit value as is', () => {
	testType.equal<MathDevice.NormalizeValueDevice<[0], []>, [0]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[9], []>, [9]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[-9], []>, [-9]>(true)
})

it('splits single double-digits value', () => {
	testType.equal<MathDevice.NormalizeValueDevice<[10], []>, [1, 0]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[99], []>, [9, 9]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[-99], []>, [-9, 9]>(true)
})

it('shifts digits for double-digits', () => {
	testType.equal<MathDevice.NormalizeValueDevice<[1, 10], []>, [2, 0]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[1, 20], []>, [3, 0]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[1, 90], []>, [1, 0, 0]>(true)
})

it('shifts digits for negative', () => {
	testType.equal<MathDevice.NormalizeValueDevice<[2, -1], []>, [1, 9]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[2, -10], []>, [1, 0]>(true)
})

it('handles 2 digits', () => {
	testType.equal<MathDevice.NormalizeValueDevice<[1, 1], []>, [1, 1]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[1, 9], []>, [1, 9]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[10, 9], []>, [1, 0, 9]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[-10, 9], []>, [-1, 0, 9]>(true)
})

it('handles multiple digits', () => {
	testType.equal<MathDevice.NormalizeValueDevice<[1, 2, 3], []>, [1, 2, 3]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[9, 9, 10], []>, [1, 0, 0, 0]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[9, 9, -1], []>, [9, 8, 9]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[9, -1, -1], []>, [8, 8, 9]>(true)

	testType.equal<MathDevice.NormalizeValueDevice<[1, 0, -1], []>, [0, 9, 9]>(true)
})

it('handles numbers with 0 prefixes', () => {
	// simulating 0.xxx
	testType.equal<MathDevice.NormalizeValueDevice<[0, 1, 0, 1], []>, [0, 1, 0, 1]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[0, 1, 0, 10], []>, [0, 1, 1, 0]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[0, 1, 9, 10], []>, [0, 2, 0, 0]>(true)
	testType.equal<MathDevice.NormalizeValueDevice<[0, 1, 0, -1], []>, [0, 0, 9, 9]>(true)
	// testType.equal<MathDevice.NormalizeValueDevice<[0, 0, 0, -1], []>, [0, 0, 0, -1]>(true)
})

0 - 0.001

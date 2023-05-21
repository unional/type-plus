import { it } from '@jest/globals'
import { testType } from '../index.js'
import type { MathDevice } from './math_device.js'

it('keeps single digit intact', () => {
	testType.equal<MathDevice.NormalizeDigit<0>, [0]>(true)
	testType.equal<MathDevice.NormalizeDigit<-1>, [-1]>(true)
	testType.equal<MathDevice.NormalizeDigit<-2>, [-2]>(true)
	testType.equal<MathDevice.NormalizeDigit<-3>, [-3]>(true)
	testType.equal<MathDevice.NormalizeDigit<-4>, [-4]>(true)
	testType.equal<MathDevice.NormalizeDigit<-5>, [-5]>(true)
	testType.equal<MathDevice.NormalizeDigit<-6>, [-6]>(true)
	testType.equal<MathDevice.NormalizeDigit<-7>, [-7]>(true)
	testType.equal<MathDevice.NormalizeDigit<-8>, [-8]>(true)
	testType.equal<MathDevice.NormalizeDigit<-9>, [-9]>(true)

	testType.equal<MathDevice.NormalizeDigit<1>, [1]>(true)
	testType.equal<MathDevice.NormalizeDigit<2>, [2]>(true)
	testType.equal<MathDevice.NormalizeDigit<3>, [3]>(true)
	testType.equal<MathDevice.NormalizeDigit<4>, [4]>(true)
	testType.equal<MathDevice.NormalizeDigit<5>, [5]>(true)
	testType.equal<MathDevice.NormalizeDigit<6>, [6]>(true)
	testType.equal<MathDevice.NormalizeDigit<7>, [7]>(true)
	testType.equal<MathDevice.NormalizeDigit<8>, [8]>(true)
	testType.equal<MathDevice.NormalizeDigit<9>, [9]>(true)
})

it('normalizes multiple digits', () => {
	testType.equal<MathDevice.NormalizeDigit<10>, [1, 0]>(true)
	testType.equal<MathDevice.NormalizeDigit<-10>, [-1, 0]>(true)

	testType.equal<MathDevice.NormalizeDigit<81>, [8, 1]>(true)
	testType.equal<MathDevice.NormalizeDigit<-81>, [-8, 1]>(true)

	// We will not normalize number > 81
	// this is added just for testing
	testType.equal<MathDevice.NormalizeDigit<100>, [1, 0, 0]>(true)
	testType.equal<MathDevice.NormalizeDigit<-100>, [-1, 0, 0]>(true)
})

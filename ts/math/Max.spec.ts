import { test } from '@jest/globals'
import { Max, testType } from '../index.js'

test('only support whole number', () => {
	testType.never<Max<0.1, 1>>(true)
	testType.never<Max<1, 0.1>>(true)
})

test('number gets never', () => {
	testType.never<Max<number, 1>>(true)
	testType.never<Max<1, number>>(true)
})

test('override Fail case', () => {
	testType.strictNumber<Max<number, 1, number>>(true)
})

test('same number', () => {
	testType.equal<Max<123, 123>, 123>(true)
})

test('same number of digits', () => {
	testType.equal<Max<123, 124>, 124>(true)
	testType.equal<Max<126, 124>, 126>(true)
	testType.equal<Max<126, 224>, 224>(true)
	testType.equal<Max<726, 224>, 726>(true)
})

test('more digits win', () => {
	testType.equal<Max<123, 22>, 123>(true)
	testType.equal<Max<12, 223>, 223>(true)
	testType.equal<Max<1234567891011, 123>, 1234567891011>(true)
	testType.equal<Max<123, 1234567891011>, 1234567891011>(true)
})

test('work with negative numbers', () => {
	testType.equal<Max<0, -0>, 0>(true)
	testType.equal<Max<-0, 0>, 0>(true)
	testType.equal<Max<-0, -0>, 0>(true)

	testType.equal<Max<0, -1>, 0>(true)
	testType.equal<Max<1, -1>, 1>(true)
	testType.equal<Max<2, -1>, 2>(true)

	testType.equal<Max<-1, 0>, 0>(true)
	testType.equal<Max<-1, 1>, 1>(true)
	testType.equal<Max<-1, 2>, 2>(true)

	testType.equal<Max<-1, -2>, -1>(true)
	testType.equal<Max<-2, -2>, -2>(true)
	testType.equal<Max<-3, -2>, -2>(true)
})

test('work with large numbers', () => {
	testType.equal<Max<1000000, 0>, 1000000>(true)
	testType.equal<Max<0, 1000000>, 1000000>(true)

	testType.equal<Max<-1000000, 0>, 0>(true)
	testType.equal<Max<0, -1000000>, 0>(true)
})

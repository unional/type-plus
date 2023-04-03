import { test } from '@jest/globals'
import { testType, type GreaterThan } from '../index.js'

test('only support whole number', () => {
	testType.never<GreaterThan<0.1, 1>>(true)
	testType.never<GreaterThan<1, 0.1>>(true)
})

test('number gets never', () => {
	testType.never<GreaterThan<number, 1>>(true)
	testType.never<GreaterThan<1, number>>(true)
})

test('override Fail case', () => {
	testType.strictNumber<GreaterThan<number, 2, number>>(true)
})

test('n > n is false', () => {
	testType.false<GreaterThan<0, 0>>(true)
	testType.false<GreaterThan<1, 1>>(true)
	testType.false<GreaterThan<12, 12>>(true)
})

test('with same number of digits', () => {
	testType.true<GreaterThan<1, 0>>(true)
	testType.true<GreaterThan<22, 11>>(true)
	testType.true<GreaterThan<20, 19>>(true)
	testType.true<GreaterThan<19, 10>>(true)

	testType.false<GreaterThan<0, 1>>(true)
	testType.false<GreaterThan<11, 22>>(true)
	testType.false<GreaterThan<19, 20>>(true)
	testType.false<GreaterThan<10, 19>>(true)
})

test('with different number of digits', () => {
	testType.false<GreaterThan<0, 1>>(true)
	testType.false<GreaterThan<9, 100>>(true)
	testType.true<GreaterThan<10, 1>>(true)
	testType.true<GreaterThan<123, 32>>(true)
	testType.true<GreaterThan<123, 13>>(true)
})

test('-0 > 0 and 0 > -0 are false', () => {
	testType.false<GreaterThan<-0, 0>>(true)
	testType.false<GreaterThan<0, -0>>(true)
})

test('works with negative numbers', () => {
	testType.true<GreaterThan<0, -1>>(true)
	testType.true<GreaterThan<1, -1>>(true)
	testType.true<GreaterThan<2, -1>>(true)

	testType.false<GreaterThan<-1, 0>>(true)
	testType.false<GreaterThan<-1, 1>>(true)
	testType.false<GreaterThan<-1, 2>>(true)

	testType.false<GreaterThan<-0, -0>>(true)
	testType.false<GreaterThan<-1, -1>>(true)

	testType.true<GreaterThan<-0, -1>>(true)
	testType.false<GreaterThan<-1, -1>>(true)
	testType.false<GreaterThan<-2, -1>>(true)

	testType.false<GreaterThan<-1, -0>>(true)
	testType.false<GreaterThan<-1, -1>>(true)
	testType.true<GreaterThan<-1, -2>>(true)
})

test('work with large numbers', () => {
	testType.true<GreaterThan<1000000, 0>>(true)
	testType.false<GreaterThan<0, 1000000>>(true)

	testType.false<GreaterThan<-1000000, 0>>(true)
	testType.true<GreaterThan<0, -1000000>>(true)
})

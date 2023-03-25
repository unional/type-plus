import { type, type GreaterThan } from '../index.js'

test('only support whole number', () => {
	type.never<GreaterThan<0.1, 1>>(true)
	type.never<GreaterThan<1, 0.1>>(true)
})

test('number gets never', () => {
	type.never<GreaterThan<number, 1>>(true)
	type.never<GreaterThan<1, number>>(true)
})

test('override Fail case', () => {
	type.number<GreaterThan<number, 2, number>>(true)
})

test('n > n is false', () => {
	type.false<GreaterThan<0, 0>>(true)
	type.false<GreaterThan<1, 1>>(true)
	type.false<GreaterThan<12, 12>>(true)
})

test('with same number of digits', () => {
	type.true<GreaterThan<1, 0>>(true)
	type.true<GreaterThan<22, 11>>(true)
	type.true<GreaterThan<20, 19>>(true)
	type.true<GreaterThan<19, 10>>(true)

	type.false<GreaterThan<0, 1>>(true)
	type.false<GreaterThan<11, 22>>(true)
	type.false<GreaterThan<19, 20>>(true)
	type.false<GreaterThan<10, 19>>(true)
})

test('with different number of digits', () => {
	type.false<GreaterThan<0, 1>>(true)
	type.false<GreaterThan<9, 100>>(true)
	type.true<GreaterThan<10, 1>>(true)
	type.true<GreaterThan<123, 32>>(true)
	type.true<GreaterThan<123, 13>>(true)
})

test('-0 > 0 and 0 > -0 are false', () => {
	type.false<GreaterThan<-0, 0>>(true)
	type.false<GreaterThan<0, -0>>(true)
})

test('works with negative numbers', () => {
	type.true<GreaterThan<0, -1>>(true)
	type.true<GreaterThan<1, -1>>(true)
	type.true<GreaterThan<2, -1>>(true)

	type.false<GreaterThan<-1, 0>>(true)
	type.false<GreaterThan<-1, 1>>(true)
	type.false<GreaterThan<-1, 2>>(true)

	type.false<GreaterThan<-0, -0>>(true)
	type.false<GreaterThan<-1, -1>>(true)

	type.true<GreaterThan<-0, -1>>(true)
	type.false<GreaterThan<-1, -1>>(true)
	type.false<GreaterThan<-2, -1>>(true)

	type.false<GreaterThan<-1, -0>>(true)
	type.false<GreaterThan<-1, -1>>(true)
	type.true<GreaterThan<-1, -2>>(true)
})

test('work with large numbers', () => {
	type.true<GreaterThan<1000000, 0>>(true)
	type.false<GreaterThan<0, 1000000>>(true)

	type.false<GreaterThan<-1000000, 0>>(true)
	type.true<GreaterThan<0, -1000000>>(true)
})

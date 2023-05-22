import { test } from '@jest/globals'
import { testType, type Subtract } from '../index.js'

test('only support positive and whole number', () => {
	testType.never<Subtract<0.1, 1>>(true)
	testType.never<Subtract<-1, 1>>(true)
	testType.never<Subtract<1, 0.1>>(true)
	testType.never<Subtract<1, -1>>(true)
})

test('number gets Fail', () => {
	testType.never<Subtract<number, 1>>(true)
	testType.never<Subtract<1, number>>(true)
})

test('override Fail case', () => {
	testType.strictNumber<Subtract<number, 1, number>>(true)
})

test('single digit', () => {
	testType.equal<Subtract<0, 0>, 0>(true)
	testType.equal<Subtract<0, 0>, 0>(true)
	testType.equal<Subtract<1, 1>, 0>(true)
	testType.equal<Subtract<2, 2>, 0>(true)
	testType.equal<Subtract<3, 3>, 0>(true)
	testType.equal<Subtract<4, 4>, 0>(true)
	testType.equal<Subtract<5, 5>, 0>(true)
	testType.equal<Subtract<6, 6>, 0>(true)
	testType.equal<Subtract<7, 7>, 0>(true)
	testType.equal<Subtract<8, 8>, 0>(true)
	testType.equal<Subtract<9, 9>, 0>(true)
})

test('multi digits', () => {
	testType.equal<Subtract<123, 23>, 100>(true)
	testType.equal<Subtract<100, 1>, 99>(true)
	testType.equal<Subtract<7777, 1234>, 6543>(true)
})

test('negative results gets Fail', () => {
	testType.equal<Subtract<1, 2, 'no~~'>, 'no~~'>(true)
	testType.never<Subtract<1233, 1234>>(true)
})

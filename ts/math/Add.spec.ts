import { describe, test } from '@jest/globals'
import type { Add, Increment } from '../index.js'
import { testType } from '../index.js'

describe('Add<A, B>', () => {
	test('fractional A gets never', () => {
		testType.never<Add<1.1, 1>>(true)
	})

	test('negative A gets never', () => {
		testType.never<Add<-1, 1>>(true)
	})

	test('fractional B gets never', () => {
		testType.never<Add<1, 1.2>>(true)
	})

	test('negative B gets never', () => {
		testType.never<Add<1, -1>>(true)
	})

	test('number gets Fail', () => {
		testType.never<Add<number, 1>>(true)
		testType.never<Add<1, number>>(true)

		testType.equal<Add<number, 1, number>, number>(true)
		testType.equal<Add<1, number, number>, number>(true)
	})

	describe('single digit', () => {
		test('0 + n = n', () => {
			testType.equal<Add<0, 0>, 0>(true)
			testType.equal<Add<0, 1>, 1>(true)
			testType.equal<Add<0, 2>, 2>(true)
			testType.equal<Add<0, 3>, 3>(true)
			testType.equal<Add<0, 4>, 4>(true)
			testType.equal<Add<0, 5>, 5>(true)
			testType.equal<Add<0, 6>, 6>(true)
			testType.equal<Add<0, 7>, 7>(true)
			testType.equal<Add<0, 8>, 8>(true)
			testType.equal<Add<0, 9>, 9>(true)
		})
		test('9 + n', () => {
			testType.equal<Add<9, 0>, 9>(true)
			testType.equal<Add<9, 1>, 10>(true)
			testType.equal<Add<9, 2>, 11>(true)
			testType.equal<Add<9, 3>, 12>(true)
			testType.equal<Add<9, 4>, 13>(true)
			testType.equal<Add<9, 5>, 14>(true)
			testType.equal<Add<9, 6>, 15>(true)
			testType.equal<Add<9, 7>, 16>(true)
			testType.equal<Add<9, 8>, 17>(true)
			testType.equal<Add<9, 9>, 18>(true)
		})
	})

	test('1 + 2 digits', () => {
		testType.equal<Add<3, 13>, 16>(true)
		testType.equal<Add<9, 99>, 108>(true)
	})

	test('2 + 1 digits', () => {
		testType.equal<Add<13, 3>, 16>(true)
		testType.equal<Add<99, 9>, 108>(true)
	})

	test('2 + 2 digits', () => {
		testType.equal<Add<10, 10>, 20>(true)
		testType.equal<Add<19, 19>, 38>(true)
	})

	test('n + n digits', () => {
		testType.equal<Add<1234, 6543>, 7777>(true)
	})
})

describe('Increment<A>', () => {
	test('add 1', () => {
		testType.equal<Increment<0>, 1>(true)
	})
	test('work with large number', () => {
		testType.equal<Increment<7776>, 7777>(true)
	})
})

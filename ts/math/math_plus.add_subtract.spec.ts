import { describe, it, test } from '@jest/globals'
import type { Add } from '../index.js'
import { testType } from '../index.js'

it('adds two positive bigints', () => {
	testType.equal<Add<1n, 1n>, 2n>(true)

	testType.equal<Add<1n, 10n>, 11n>(true)
	testType.equal<Add<10n, 1n>, 11n>(true)

	testType.equal<Add<123n, 123n>, 246n>(true)

	testType.equal<Add<19n, 1n>, 20n>(true)
	testType.equal<Add<1n, 19n>, 20n>(true)

	testType.equal<Add<13579n, 97531n>, 111110n>(true)
})

it('adds two negative bigints', () => {
	testType.equal<Add<-1n, -1n>, -2n>(true)

	testType.equal<Add<-1n, -10n>, -11n>(true)
	testType.equal<Add<-10n, -1n>, -11n>(true)

	testType.equal<Add<-123n, -123n>, -246n>(true)

	testType.equal<Add<-19n, -1n>, -20n>(true)
	testType.equal<Add<-1n, -19n>, -20n>(true)

	testType.equal<Add<-13579n, -97531n>, -111110n>(true)
})

it('adds a negative bigint to a positive bigint', () => {
	testType.equal<Add<1n, -1n>, 0n>(true)
	testType.equal<Add<10n, -1n>, 9n>(true)
})

it('errors when trying to add a non-integer to a bigint', () => {
	testType.equal<Add<1n, 1.2>, 'Cannot add a non-integer to a bigint'>(true)
})

it('can add an integer to a bigint', () => {
	testType.equal<Add<1n, 1>, 2n>(true)
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

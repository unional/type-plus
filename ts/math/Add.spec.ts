import type { Add, Increment } from '../index.js'
import { type } from '../index.js'

describe('Add<A, B>', () => {
	test('fractional A gets never', () => {
		type.never<Add<1.1, 1>>(true)
	})

	test('negative A gets never', () => {
		type.never<Add<-1, 1>>(true)
	})

	test('fractional B gets never', () => {
		type.never<Add<1, 1.2>>(true)
	})

	test('negative B gets never', () => {
		type.never<Add<1, -1>>(true)
	})

	test('number gets Fail', () => {
		type.never<Add<number, 1>>(true)
		type.never<Add<1, number>>(true)

		type.equal<Add<number, 1, number>, number>(true)
		type.equal<Add<1, number, number>, number>(true)
	})

	describe('single digit', () => {
		test('0 + n = n', () => {
			type.equal<Add<0, 0>, 0>(true)
			type.equal<Add<0, 1>, 1>(true)
			type.equal<Add<0, 2>, 2>(true)
			type.equal<Add<0, 3>, 3>(true)
			type.equal<Add<0, 4>, 4>(true)
			type.equal<Add<0, 5>, 5>(true)
			type.equal<Add<0, 6>, 6>(true)
			type.equal<Add<0, 7>, 7>(true)
			type.equal<Add<0, 8>, 8>(true)
			type.equal<Add<0, 9>, 9>(true)
		})
		test('9 + n', () => {
			type.equal<Add<9, 0>, 9>(true)
			type.equal<Add<9, 1>, 10>(true)
			type.equal<Add<9, 2>, 11>(true)
			type.equal<Add<9, 3>, 12>(true)
			type.equal<Add<9, 4>, 13>(true)
			type.equal<Add<9, 5>, 14>(true)
			type.equal<Add<9, 6>, 15>(true)
			type.equal<Add<9, 7>, 16>(true)
			type.equal<Add<9, 8>, 17>(true)
			type.equal<Add<9, 9>, 18>(true)
		})
	})

	test('1 + 2 digits', () => {
		type.equal<Add<3, 13>, 16>(true)
		type.equal<Add<9, 99>, 108>(true)
	})

	test('2 + 1 digits', () => {
		type.equal<Add<13, 3>, 16>(true)
		type.equal<Add<99, 9>, 108>(true)
	})

	test('2 + 2 digits', () => {
		type.equal<Add<10, 10>, 20>(true)
		type.equal<Add<19, 19>, 38>(true)
	})

	test('n + n digits', () => {
		type.equal<Add<1234, 6543>, 7777>(true)
	})
})

describe('Increment<A>', () => {
	test('add 1', () => {
		type.equal<Increment<0>, 1>(true)
	})
	test('work with large number', () => {
		type.equal<Increment<7776>, 7777>(true)
	})
})

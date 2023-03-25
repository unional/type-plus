import { Subtract } from '../index.js'
import { type } from '../type/type.js'

test('only support positive and whole number', () => {
	type.never<Subtract<0.1, 1>>(true)
	type.never<Subtract<-1, 1>>(true)
	type.never<Subtract<1, 0.1>>(true)
	type.never<Subtract<1, -1>>(true)
})

test('number gets Fail', () => {
	type.never<Subtract<number, 1>>(true)
	type.never<Subtract<1, number>>(true)
})

test('override Fail case', () => {
	type.number<Subtract<number, 1, number>>(true)
})

test('single digit', () => {
	type.equal<Subtract<0, 0>, 0>(true)
	type.equal<Subtract<0, 0>, 0>(true)
	type.equal<Subtract<1, 1>, 0>(true)
	type.equal<Subtract<2, 2>, 0>(true)
	type.equal<Subtract<3, 3>, 0>(true)
	type.equal<Subtract<4, 4>, 0>(true)
	type.equal<Subtract<5, 5>, 0>(true)
	type.equal<Subtract<6, 6>, 0>(true)
	type.equal<Subtract<7, 7>, 0>(true)
	type.equal<Subtract<8, 8>, 0>(true)
	type.equal<Subtract<9, 9>, 0>(true)
})

test('multi digits', () => {
	type.equal<Subtract<123, 23>, 100>(true)
	type.equal<Subtract<7777, 1234>, 6543>(true)
})

test('negative results gets Fail', () => {
	type.equal<Subtract<1, 2, 'no~~'>, 'no~~'>(true)
	type.never<Subtract<1233, 1234>>(true)
})

import { type NumberType, isType } from '../index.js'

it('returns number for type number', () => {
	isType.equal<true, NumberType<number>, number>()
})

it('returns never for numeric literals', () => {
	isType.never<NumberType<0>>()
	isType.never<NumberType<1.1>>()
})

it('can override Then, Else', () => {
	isType.equal<true, NumberType<number, true, false>, true>()
	isType.equal<true, NumberType<1, true, false>, false>()
})

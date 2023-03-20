import { type NumberType, isType } from '../index.js'

it('returns number for type number', () => {
	isType.equal<true, NumberType<number>, number>()
})

it('returns never for never', () => {
	isType.never<NumberType<never>>()
	isType.never<NumberType<any>>()
})

it('returns never if N is union of non number', () => {
	isType.never<NumberType<number | string>>()
})

it('returns number if N is union of number and number literal', () => {
	isType.equal<true, number, NumberType<number | 1>>()
})

it('returns never for numeric literals', () => {
	isType.never<NumberType<0>>()
	isType.never<NumberType<1.1>>()
})

it('can override Then, Else', () => {
	isType.equal<true, NumberType<number, true, false>, true>()
	isType.equal<true, NumberType<1, true, false>, false>()
	isType.equal<true, NumberType<never, true, false>, false>()
})

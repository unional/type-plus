import { isType, type IsInteger } from '../index.js'

it('returns false if N is number as it can contain float', () => {
	isType.equal<true, IsInteger<number>, false>()
})

it('returns false if N is never', () => {
	isType.equal<true, IsInteger<never>, false>()
})

test('whole number is true', () => {
	isType.equal<true, true, IsInteger<1>>()
	isType.equal<true, true, IsInteger<1>>()
	isType.equal<true, true, IsInteger<0>>()
	isType.equal<true, true, IsInteger<0>>()
	isType.equal<true, true, IsInteger<-0>>()
	isType.equal<true, true, IsInteger<-1>>()
})

test('fraction is false', () => {
	isType.equal<true, false, IsInteger<0.1>>()
	isType.equal<true, false, IsInteger<-0.1>>()
})

import { type Integer, isType } from '../index.js'

it('returns never if N is number type', () => {
	isType.never<Integer<number>>()
})

it('returns never if N is never', () => {
	isType.never<Integer<never>>()
})

it('returns never if N is float', () => {
	isType.never<Integer<1.1>>()
	isType.never<Integer<-1.1>>()
})

it('returns N if N is integer', () => {
	isType.equal<true, Integer<-1>, -1>()
	isType.equal<true, Integer<-2>, -2>()
	isType.equal<true, Integer<-0>, 0>()
	isType.equal<true, Integer<1>, 1>()
	isType.equal<true, Integer<2>, 2>()
})

it('returns N if N is bigint', () => {
	isType.equal<true, Integer<-1n>, -1n>()
	isType.equal<true, Integer<-2n>, -2n>()
	isType.equal<true, Integer<-0n>, 0n>()
	isType.equal<true, Integer<1n>, 1n>()
	isType.equal<true, Integer<2n>, 2n>()
})

it('can override Then/Else', () => {
	isType.equal<true, Integer<-1, true, false>, true>()
	isType.f<Integer<1.1, true, false>>()
	isType.f<Integer<never, true, false>>()
})

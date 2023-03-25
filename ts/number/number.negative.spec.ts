import { isType, type Negative } from '../index.js'

it('returns never if N is number or never', () => {
	isType.never<Negative<number>>()
	isType.never<Negative<never>>()
})

it('acts as a type filter by default', () => {
	isType.equal<true, Negative<-1>, -1>()
	isType.equal<true, Negative<-2>, -2>()
	isType.equal<true, Negative<-0>, never>()
	isType.equal<true, Negative<1>, never>()
	isType.equal<true, Negative<2>, never>()

	isType.equal<true, Negative<-1n>, -1n>()
	isType.equal<true, Negative<-2n>, -2n>()
	isType.equal<true, Negative<-0n>, never>()
	isType.equal<true, Negative<1n>, never>()
	isType.equal<true, Negative<2n>, never>()
})

it('can be a type predicate', () => {
	isType.equal<true, Negative<-1, true, false>, true>()
	isType.equal<true, Negative<-2, true, false>, true>()
	isType.equal<true, Negative<-0, true, false>, false>()
	isType.equal<true, Negative<1, true, false>, false>()
	isType.equal<true, Negative<2, true, false>, false>()

	isType.equal<true, Negative<-1n, true, false>, true>()
	isType.equal<true, Negative<-2n, true, false>, true>()
	isType.equal<true, Negative<-0n, true, false>, false>()
	isType.equal<true, Negative<1n, true, false>, false>()
	isType.equal<true, Negative<2n, true, false>, false>()

	isType.equal<true, Negative<never, true, false>, false>()
})

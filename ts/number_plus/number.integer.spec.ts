import { Integer, isType } from '../index.js'

it('fails if input is number', () => {
	isType.equal<true, Integer<number>, never>()
})

it('is a type filter by default', () => {
	isType.equal<true, Integer<-1>, -1>()
	isType.equal<true, Integer<-2>, -2>()
	isType.equal<true, Integer<-0>, 0>()
	isType.equal<true, Integer<1>, 1>()
	isType.equal<true, Integer<2>, 2>()

	isType.equal<true, Integer<-1n>, -1n>()
	isType.equal<true, Integer<-2n>, -2n>()
	isType.equal<true, Integer<-0n>, 0n>()
	isType.equal<true, Integer<1n>, 1n>()
	isType.equal<true, Integer<2n>, 2n>()

	isType.never<Integer<1.1>>()
	isType.never<Integer<-1.1>>()
})

it('can be a type predicate', () => {
	isType.equal<true, Integer<-1, true, false>, true>()
	isType.equal<true, Integer<-2, true, false>, true>()
	isType.equal<true, Integer<-0, true, false>, true>()
	isType.equal<true, Integer<1, true, false>, true>()
	isType.equal<true, Integer<2, true, false>, true>()

	isType.equal<true, Integer<-1n, true, false>, true>()
	isType.equal<true, Integer<-2n, true, false>, true>()
	isType.equal<true, Integer<-0n, true, false>, true>()
	isType.equal<true, Integer<1n, true, false>, true>()
	isType.equal<true, Integer<2n, true, false>, true>()

	isType.f<Integer<1.1, true, false>>()
	isType.f<Integer<-1.1, true, false>>()
})

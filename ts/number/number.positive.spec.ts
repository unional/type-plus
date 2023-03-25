import { isType, type Positive } from '../index.js'

it('returns never if N is number as it can include negative', () => {
	isType.never<Positive<number>>()
})

it('returns never if N is never or any', () => {
	isType.never<Positive<never>>()
	isType.never<Positive<any>>()
})

it('returns 0 if N is 0', () => {
	isType.equal<true, Positive<0>, 0>()
	isType.equal<true, Positive<0n>, 0n>()
})

it('returns N if N is positive', () => {
	isType.equal<true, Positive<1>, 1>()
	isType.equal<true, Positive<1n>, 1n>()
})

it('returns never if N is negative', () => {
	isType.never<Positive<-1>>()
	isType.never<Positive<-1n>>()
})

it('can override Then/Else', () => {
	isType.equal<true, Positive<1, true, false>, true>()
	isType.equal<true, Positive<-1, true, false>, false>()
	isType.equal<true, Positive<never, true, false>, false>()
})

import { isType, type IsPositive } from '../index.js'

it('returns false if N is number as it can include negative', () => {
	isType.equal<true, IsPositive<number>, false>()
})

it('returns false if N is never or any', () => {
	isType.equal<true, IsPositive<never>, false>()
	isType.equal<true, IsPositive<any>, false>()
})

it('returns true for 0', () => {
	isType.equal<true, IsPositive<0>, true>()
	isType.equal<true, IsPositive<0n>, true>()
})

it('returns true if N is positive', () => {
	isType.equal<true, IsPositive<1>, true>()
	isType.equal<true, IsPositive<1n>, true>()
})

it('returns false if N is negative', () => {
	isType.equal<true, IsPositive<-1>, false>()
	isType.equal<true, IsPositive<-1n>, false>()
})

it('can override Then/Else', () => {
	isType.equal<true, IsPositive<1, 1, 2>, 1>()
	isType.equal<true, IsPositive<-1, 1, 2>, 2>()
	isType.equal<true, IsPositive<never, 1, 2>, 2>()
})

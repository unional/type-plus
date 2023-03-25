import { NonNegative, isType } from '../index.js'

it('acts as a type filter by default', () => {
	isType.equal<false, NonNegative<-1>, -1>()
	isType.equal<false, NonNegative<-2>, -2>()
	isType.equal<false, NonNegative<-0>, never>()
	isType.equal<false, NonNegative<1>, never>()
	isType.equal<false, NonNegative<2>, never>()

	isType.equal<false, NonNegative<-1n>, -1n>()
	isType.equal<false, NonNegative<-2n>, -2n>()
	isType.equal<false, NonNegative<-0n>, never>()
	isType.equal<false, NonNegative<1n>, never>()
	isType.equal<false, NonNegative<2n>, never>()
})

it('can be a type predicate', () => {
	isType.equal<false, NonNegative<-1, true, false>, true>()
	isType.equal<false, NonNegative<-2, true, false>, true>()
	isType.equal<false, NonNegative<-0, true, false>, false>()
	isType.equal<false, NonNegative<1, true, false>, false>()
	isType.equal<false, NonNegative<2, true, false>, false>()

	isType.equal<false, NonNegative<-1n, true, false>, true>()
	isType.equal<false, NonNegative<-2n, true, false>, true>()
	isType.equal<false, NonNegative<-0n, true, false>, false>()
	isType.equal<false, NonNegative<1n, true, false>, false>()
	isType.equal<false, NonNegative<2n, true, false>, false>()

	isType.equal<false, NonNegative<never, true, false>, false>()
})

import { type, type NotNegative } from '../index.js'

it('returns T if T is number or bigint', () => {
	type.equal<NotNegative<number>, number>(true)
	type.equal<NotNegative<bigint>, bigint>(true)
})

it('returns T if T is 0 or positive literals', () => {
	type.equal<NotNegative<-0>, -0>(true)
	type.equal<NotNegative<0>, 0>(true)
	type.equal<NotNegative<1>, 1>(true)
	type.equal<NotNegative<2>, 2>(true)
	type.equal<NotNegative<1.0>, 1.0>(true)
	type.equal<NotNegative<1.1>, 1.1>(true)

	type.equal<NotNegative<0n>, 0n>(true)
	type.equal<NotNegative<1n>, 1n>(true)
})

it('returns never if T is negative', () => {
	type.equal<NotNegative<-1>, never>(true)
	type.equal<NotNegative<-2>, never>(true)
})

it('returns T if T is a special type', () => {
	type.equal<NotNegative<any>, any>(true)
	type.equal<NotNegative<unknown>, unknown>(true)
	type.equal<NotNegative<never>, never>(true)
	type.equal<NotNegative<void>, void>(true)
})

test('returns T for other types', () => {
	type.equal<NotNegative<undefined>, undefined>(true)
	type.equal<NotNegative<null>, null>(true)
	type.equal<NotNegative<boolean>, boolean>(true)
	type.equal<NotNegative<true>, true>(true)
	type.equal<NotNegative<false>, false>(true)
	type.equal<NotNegative<string>, string>(true)
	type.equal<NotNegative<''>, ''>(true)
	type.equal<NotNegative<symbol>, symbol>(true)
	type.equal<NotNegative<{}>, {}>(true)
	type.equal<NotNegative<string[]>, string[]>(true)
	type.equal<NotNegative<[]>, []>(true)
	type.equal<NotNegative<Function>, Function>(true)
	type.equal<NotNegative<() => void>, () => void>(true)
})

it('returns T if T is union of positive numeric values', () => {
	type.equal<NotNegative<1 | 1.1>, 1 | 1.1>(true)
	type.equal<NotNegative<1 | 1n>, 1 | 1n>(true)
	type.equal<NotNegative<1.1 | 1n>, 1.1 | 1n>(true)
})

it('returns T if T is union of mixing positive and negative value', () => {
	type.equal<NotNegative<1 | -1>, 1 | -1>(true)
})

it('returns never if T is union with negative numeric values', () => {
	type.equal<NotNegative<-1 | -2>, never>(true)
	type.equal<NotNegative<-1 | -2n>, never>(true)
	type.equal<NotNegative<-1n | -2n>, never>(true)
})

it('returns never if T is intersection of negative number', () => {
	type.equal<NotNegative<-1 & { a: 1 }>, never>(true)
	type.equal<NotNegative<-1n & { a: 1 }>, never>(true)
})

it('can override Then/Else', () => {
	type.equal<NotNegative<1, 1, 2>, 1>(true)
	type.equal<NotNegative<1.1, 1, 2>, 1>(true)
	type.equal<NotNegative<1n, 1, 2>, 1>(true)

	type.equal<NotNegative<any, 1, 2>, 1 | 2>(true)

	type.equal<NotNegative<-2, 1, 2>, 2>(true)
	type.equal<NotNegative<unknown, 1, 2>, 1>(true)
	type.equal<NotNegative<never, 1, 2>, 1>(true)
	type.equal<NotNegative<void, 1, 2>, 1>(true)
})

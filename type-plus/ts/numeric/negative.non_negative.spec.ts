import { it } from '@jest/globals'
import { testType, type NotNegative } from '../index.js'

it('returns T if T is number or bigint', () => {
	testType.equal<NotNegative<number>, number>(true)
	testType.equal<NotNegative<bigint>, bigint>(true)
})

it('returns T if T is 0 or positive literals', () => {
	testType.equal<NotNegative<-0>, -0>(true)
	testType.equal<NotNegative<0>, 0>(true)
	testType.equal<NotNegative<1>, 1>(true)
	testType.equal<NotNegative<2>, 2>(true)
	testType.equal<NotNegative<1.0>, 1.0>(true)
	testType.equal<NotNegative<1.1>, 1.1>(true)

	testType.equal<NotNegative<0n>, 0n>(true)
	testType.equal<NotNegative<1n>, 1n>(true)
})

it('returns never if T is negative', () => {
	testType.equal<NotNegative<-1>, never>(true)
	testType.equal<NotNegative<-2>, never>(true)
})

it('returns T if T is a special type', () => {
	testType.equal<NotNegative<any>, any>(true)
	testType.equal<NotNegative<unknown>, unknown>(true)
	testType.equal<NotNegative<never>, never>(true)
	testType.equal<NotNegative<void>, void>(true)
})

it('returns T for other types', () => {
	testType.equal<NotNegative<undefined>, undefined>(true)
	testType.equal<NotNegative<null>, null>(true)
	testType.equal<NotNegative<boolean>, boolean>(true)
	testType.equal<NotNegative<true>, true>(true)
	testType.equal<NotNegative<false>, false>(true)
	testType.equal<NotNegative<string>, string>(true)
	testType.equal<NotNegative<''>, ''>(true)
	testType.equal<NotNegative<symbol>, symbol>(true)
	testType.equal<NotNegative<{}>, {}>(true)
	testType.equal<NotNegative<string[]>, string[]>(true)
	testType.equal<NotNegative<[]>, []>(true)
	testType.equal<NotNegative<Function>, Function>(true)
	testType.equal<NotNegative<() => void>, () => void>(true)
})

it('returns T if T is union of positive numeric values', () => {
	testType.equal<NotNegative<1 | 1.1>, 1 | 1.1>(true)
	testType.equal<NotNegative<1 | 1n>, 1 | 1n>(true)
	testType.equal<NotNegative<1.1 | 1n>, 1.1 | 1n>(true)
})

it('returns T if T is union of mixing positive and negative value', () => {
	testType.equal<NotNegative<1 | -1>, 1 | -1>(true)
})

it('returns never if T is union with negative numeric values', () => {
	testType.equal<NotNegative<-1 | -2>, never>(true)
	testType.equal<NotNegative<-1 | -2n>, never>(true)
	testType.equal<NotNegative<-1n | -2n>, never>(true)
})

it('returns never if T is intersection of negative number', () => {
	// @ts-expect-error
	testType.equal<NotNegative<-1 & { a: 1 }>, never>(true)
	// @ts-expect-error
	testType.equal<NotNegative<-1n & { a: 1 }>, never>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotNegative<1, 1, 2>, 1>(true)
	testType.equal<NotNegative<1.1, 1, 2>, 1>(true)
	testType.equal<NotNegative<1n, 1, 2>, 1>(true)

	testType.equal<NotNegative<any, 1, 2>, 1 | 2>(true)

	testType.equal<NotNegative<-2, 1, 2>, 2>(true)
	testType.equal<NotNegative<unknown, 1, 2>, 1>(true)
	testType.equal<NotNegative<never, 1, 2>, 1>(true)
	testType.equal<NotNegative<void, 1, 2>, 1>(true)
})

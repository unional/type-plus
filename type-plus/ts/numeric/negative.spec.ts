import { it } from '@jest/globals'
import { testType, type Negative } from '../index.js'

it('returns T if T is number or bigint', () => {
	testType.equal<Negative<number>, number>(true)
	testType.equal<Negative<bigint>, bigint>(true)
})

it('returns never if T is 0 or positive literals', () => {
	testType.equal<Negative<-0>, never>(true)
	testType.equal<Negative<0>, never>(true)
	testType.equal<Negative<1>, never>(true)
	testType.equal<Negative<2>, never>(true)
	testType.equal<Negative<1.0>, never>(true)
	testType.equal<Negative<1.1>, never>(true)

	testType.equal<Negative<0n>, never>(true)
	testType.equal<Negative<1n>, never>(true)
})

it('returns T if T is negative', () => {
	testType.equal<Negative<-1>, -1>(true)
	testType.equal<Negative<-2>, -2>(true)
})

it('returns T | never if T is any', () => {
	testType.equal<Negative<any>, any>(true)
})

it('returns never if T is a special type', () => {
	testType.never<Negative<unknown>>(true)
	testType.never<Negative<never>>(true)
	testType.never<Negative<void>>(true)
})

it('returns never for other types', () => {
	testType.never<Negative<undefined>>(true)
	testType.never<Negative<null>>(true)
	testType.never<Negative<boolean>>(true)
	testType.never<Negative<true>>(true)
	testType.never<Negative<false>>(true)
	testType.never<Negative<string>>(true)
	testType.never<Negative<''>>(true)
	testType.never<Negative<symbol>>(true)
	testType.never<Negative<{}>>(true)
	testType.never<Negative<string[]>>(true)
	testType.never<Negative<[]>>(true)
	testType.never<Negative<Function>>(true)
	testType.never<Negative<() => void>>(true)
})

it('returns never if T is union of positive numeric values', () => {
	testType.equal<Negative<1 | 1.1>, never>(true)
	testType.equal<Negative<1 | 1n>, never>(true)
	testType.equal<Negative<1.1 | 1n>, never>(true)
})

it('returns T if T is union of mixing positive and negative value', () => {
	testType.equal<Negative<1 | -1>, 1 | -1>(true)
})

it('returns T if T is union with negative numeric values', () => {
	testType.equal<Negative<-1 | -2>, -1 | -2>(true)
	testType.equal<Negative<-1 | -2n>, -1 | -2n>(true)
	testType.equal<Negative<-1n | -2n>, -1n | -2n>(true)
})

it('returns T if T is intersection of negative number', () => {
	testType.never<Negative<-1 & { a: 1 }>>(true)
	testType.never<Negative<-1n & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<Negative<-1, 1, 2>, 1>(true)
	testType.equal<Negative<-1.1, 1, 2>, 1>(true)
	testType.equal<Negative<-1n, 1, 2>, 1>(true)

	testType.equal<Negative<any, 1, 2>, 1 | 2>(true)

	testType.equal<Negative<2, 1, 2>, 2>(true)
	testType.equal<Negative<unknown, 1, 2>, 2>(true)
	testType.equal<Negative<never, 1, 2>, 2>(true)
	testType.equal<Negative<void, 1, 2>, 2>(true)
})

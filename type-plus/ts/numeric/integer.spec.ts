import { it } from '@jest/globals'
import { testType, type Integer } from '../index.js'

it('returns never if T is number as it can contain float', () => {
	testType.never<Integer<number>>(true)
})

it('returns T if T is an integer literal', () => {
	testType.equal<Integer<-1>, -1>(true)
	testType.equal<Integer<-2>, -2>(true)
	testType.equal<Integer<-0>, 0>(true)
	testType.equal<Integer<1>, 1>(true)
	testType.equal<Integer<2>, 2>(true)
	testType.equal<Integer<1.0>, 1>(true)
})

it('returns T if T is bigint as bigint can only be integer', () => {
	testType.equal<Integer<bigint>, bigint>(true)
	testType.equal<Integer<-1n>, -1n>(true)
	testType.equal<Integer<-2n>, -2n>(true)
	testType.equal<Integer<-0n>, 0n>(true)
	testType.equal<Integer<1n>, 1n>(true)
	testType.equal<Integer<2n>, 2n>(true)
})

it('returns never if T is a fraction', () => {
	testType.never<Integer<1.1>>(true)
	testType.never<Integer<-1.1>>(true)
})

it('returns never if T is a special type', () => {
	testType.never<Integer<any>>(true)
	testType.never<Integer<unknown>>(true)
	testType.never<Integer<never>>(true)
	testType.never<Integer<void>>(true)
})

it('returns never for other types', () => {
	testType.never<Integer<undefined>>(true)
	testType.never<Integer<null>>(true)
	testType.never<Integer<number>>(true)
	testType.never<Integer<boolean>>(true)
	testType.never<Integer<true>>(true)
	testType.never<Integer<false>>(true)
	testType.never<Integer<string>>(true)
	testType.never<Integer<''>>(true)
	testType.never<Integer<symbol>>(true)
	testType.never<Integer<{}>>(true)
	testType.never<Integer<string[]>>(true)
	testType.never<Integer<[]>>(true)
	testType.never<Integer<Function>>(true)
	testType.never<Integer<() => void>>(true)
})

it('returns never if T is union of non integer', () => {
	testType.never<Integer<1 | 1.1>>(true)
})

it('returns T if T is union of integers', () => {
	testType.equal<Integer<1 | 2>, 1 | 2>(true)
	testType.equal<Integer<1n | 2n>, 1n | 2n>(true)
})

it('returns T if T is union of mixing integers of number and bigint', () => {
	testType.equal<Integer<1 | bigint>, 1 | bigint>(true)
	testType.equal<Integer<1 | 1n>, 1 | 1n>(true)
})

it('returns T if T is intersection of number', () => {
	// @ts-expect-error
	testType.equal<Integer<1 & { a: 1 }>, 1 & { a: 1 }>(true)
	testType.equal<Integer<number & { a: 1 }>, never>(true)
})

it('can override Then/Else', () => {
	testType.equal<Integer<-1, 1, 2>, 1>(true)
	testType.equal<Integer<1.1, 1, 2>, 2>(true)

	testType.equal<Integer<any, 1, 2>, 2>(true)
	testType.equal<Integer<unknown, 1, 2>, 2>(true)
	testType.equal<Integer<never, 1, 2>, 2>(true)
	testType.equal<Integer<void, 1, 2>, 2>(true)
})

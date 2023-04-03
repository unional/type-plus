import { it } from '@jest/globals'
import { testType, type StrictNumberType } from '../index.js'

it('returns T if T is number', () => {
	testType.equal<StrictNumberType<number>, number>(true)
})

it('returns never if T is number literial', () => {
	testType.never<StrictNumberType<-1>>(true)
	testType.never<StrictNumberType<0>>(true)
	testType.never<StrictNumberType<1>>(true)
	testType.never<StrictNumberType<1.1>>(true)
})

it('returns never for special types', () => {
	testType.never<StrictNumberType<void>>(true)
	testType.never<StrictNumberType<unknown>>(true)
	testType.never<StrictNumberType<any>>(true)
	testType.never<StrictNumberType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<StrictNumberType<undefined>>(true)
	testType.never<StrictNumberType<null>>(true)
	testType.never<StrictNumberType<boolean>>(true)
	testType.never<StrictNumberType<true>>(true)
	testType.never<StrictNumberType<false>>(true)
	testType.never<StrictNumberType<string>>(true)
	testType.never<StrictNumberType<''>>(true)
	testType.never<StrictNumberType<symbol>>(true)
	testType.never<StrictNumberType<bigint>>(true)
	testType.never<StrictNumberType<1n>>(true)
	testType.never<StrictNumberType<{}>>(true)
	testType.never<StrictNumberType<string[]>>(true)
	testType.never<StrictNumberType<[]>>(true)
	testType.never<StrictNumberType<Function>>(true)
	testType.never<StrictNumberType<() => void>>(true)
})

it('returns never if T is union of non number', () => {
	testType.never<StrictNumberType<number | string>>(true)
})

it('returns T if T is union of number and number literal', () => {
	testType.equal<StrictNumberType<number | 1>, number>(true)
})

it('returns never if T is intersection of number', () => {
	testType.equal<StrictNumberType<number & { a: 1 }>, never>(true)
})

it('can override Then/Else', () => {
	testType.equal<StrictNumberType<number, 1, 2>, 1>(true)
	testType.equal<StrictNumberType<0, 1, 2>, 2>(true)

	testType.equal<StrictNumberType<any, 1, 2>, 2>(true)
	testType.equal<StrictNumberType<unknown, 1, 2>, 2>(true)
	testType.equal<StrictNumberType<never, 1, 2>, 2>(true)
	testType.equal<StrictNumberType<void, 1, 2>, 2>(true)
})

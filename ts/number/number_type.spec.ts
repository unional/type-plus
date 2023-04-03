import { it } from '@jest/globals'
import { testType, type NumberType } from '../index.js'

it('returns T if T is number', () => {
	testType.equal<NumberType<number>, number>(true)
})

it('returns T if T is number literial', () => {
	testType.equal<NumberType<-1>, -1>(true)
	testType.equal<NumberType<0>, 0>(true)
	testType.equal<NumberType<1>, 1>(true)
	testType.equal<NumberType<1.1>, 1.1>(true)
})

it('returns never for special types', () => {
	testType.never<NumberType<void>>(true)
	testType.never<NumberType<unknown>>(true)
	testType.never<NumberType<any>>(true)
	testType.never<NumberType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<NumberType<undefined>>(true)
	testType.never<NumberType<null>>(true)
	testType.never<NumberType<boolean>>(true)
	testType.never<NumberType<true>>(true)
	testType.never<NumberType<false>>(true)
	testType.never<NumberType<string>>(true)
	testType.never<NumberType<''>>(true)
	testType.never<NumberType<symbol>>(true)
	testType.never<NumberType<bigint>>(true)
	testType.never<NumberType<1n>>(true)
	testType.never<NumberType<{}>>(true)
	testType.never<NumberType<string[]>>(true)
	testType.never<NumberType<[]>>(true)
	testType.never<NumberType<Function>>(true)
	testType.never<NumberType<() => void>>(true)
})

it('returns never if T is union of non number', () => {
	testType.never<NumberType<number | string>>(true)
})

it('returns T if T is union of number and number literal', () => {
	testType.equal<NumberType<number | 1>, number>(true)
})

it('returns T if T is intersection of number', () => {
	testType.equal<NumberType<number & { a: 1 }>, number & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<NumberType<number, 1, 2>, 1>(true)
	testType.equal<NumberType<0, 1, 2>, 1>(true)

	testType.equal<NumberType<any, 1, 2>, 2>(true)
	testType.equal<NumberType<unknown, 1, 2>, 2>(true)
	testType.equal<NumberType<never, 1, 2>, 2>(true)
	testType.equal<NumberType<void, 1, 2>, 2>(true)
})

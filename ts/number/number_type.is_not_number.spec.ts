import { it } from '@jest/globals'
import { testType, type IsNotNumber } from '../index.js'

it('returns false for number', () => {
	testType.false<IsNotNumber<number>>(true)
})

it('returns false if T is number literial', () => {
	testType.false<IsNotNumber<-1>>(true)
	testType.false<IsNotNumber<0>>(true)
	testType.false<IsNotNumber<1>>(true)
	testType.false<IsNotNumber<1.1>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotNumber<void>>(true)
	testType.true<IsNotNumber<unknown>>(true)
	testType.true<IsNotNumber<any>>(true)
	testType.true<IsNotNumber<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotNumber<undefined>>(true)
	testType.true<IsNotNumber<null>>(true)
	testType.true<IsNotNumber<boolean>>(true)
	testType.true<IsNotNumber<true>>(true)
	testType.true<IsNotNumber<true>>(true)
	testType.true<IsNotNumber<string>>(true)
	testType.true<IsNotNumber<''>>(true)
	testType.true<IsNotNumber<symbol>>(true)
	testType.true<IsNotNumber<bigint>>(true)
	testType.true<IsNotNumber<{}>>(true)
	testType.true<IsNotNumber<string[]>>(true)
	testType.true<IsNotNumber<[]>>(true)
	testType.true<IsNotNumber<Function>>(true)
	testType.true<IsNotNumber<() => void>>(true)
})

it('returns true if N is union of non number', () => {
	testType.true<IsNotNumber<number | string>>(true)
})

it('returns false if N is union of number and number literal', () => {
	testType.false<IsNotNumber<number | 1>>(true)
})

it('returns false if T is intersection of number', () => {
	testType.equal<IsNotNumber<number & { a: 1 }>, false>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotNumber<number, 1, 2>, 2>(true)
	testType.equal<IsNotNumber<0, 1, 2>, 2>(true)

	testType.equal<IsNotNumber<any, 1, 2>, 1>(true)
	testType.equal<IsNotNumber<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotNumber<never, 1, 2>, 1>(true)
	testType.equal<IsNotNumber<void, 1, 2>, 1>(true)
})

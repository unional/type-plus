import { it } from '@jest/globals'
import { testType, type IsNumber } from '../index.js'

it('returns true for number', () => {
	testType.true<IsNumber<number>>(true)
})

it('returns true if T is number literial', () => {
	testType.true<IsNumber<-1>>(true)
	testType.true<IsNumber<0>>(true)
	testType.true<IsNumber<1>>(true)
	testType.true<IsNumber<1.1>>(true)
})

it('returns false for special types', () => {
	testType.false<IsNumber<void>>(true)
	testType.false<IsNumber<unknown>>(true)
	testType.false<IsNumber<any>>(true)
	testType.false<IsNumber<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsNumber<undefined>>(true)
	testType.false<IsNumber<null>>(true)
	testType.false<IsNumber<boolean>>(true)
	testType.false<IsNumber<true>>(true)
	testType.false<IsNumber<false>>(true)
	testType.false<IsNumber<string>>(true)
	testType.false<IsNumber<''>>(true)
	testType.false<IsNumber<symbol>>(true)
	testType.false<IsNumber<bigint>>(true)
	testType.false<IsNumber<{}>>(true)
	testType.false<IsNumber<string[]>>(true)
	testType.false<IsNumber<[]>>(true)
	testType.false<IsNumber<Function>>(true)
	testType.false<IsNumber<() => void>>(true)
})

it('returns false if N is union of non number', () => {
	testType.false<IsNumber<number | string>>(true)
})

it('returns true if N is union of number and number literal', () => {
	testType.true<IsNumber<number | 1>>(true)
})

it('returns true if T is intersection of number', () => {
	testType.equal<IsNumber<number & { a: 1 }>, true>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNumber<number, 1, 2>, 1>(true)
	testType.equal<IsNumber<0, 1, 2>, 1>(true)

	testType.equal<IsNumber<any, 1, 2>, 2>(true)
	testType.equal<IsNumber<unknown, 1, 2>, 2>(true)
	testType.equal<IsNumber<never, 1, 2>, 2>(true)
	testType.equal<IsNumber<void, 1, 2>, 2>(true)
})

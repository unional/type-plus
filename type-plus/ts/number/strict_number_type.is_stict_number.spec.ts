import { it } from '@jest/globals'
import { testType, type IsStrictNumber } from '../index.js'

it('returns true for number', () => {
	testType.true<IsStrictNumber<number>>(true)
})

it('returns false if T is number literial', () => {
	testType.false<IsStrictNumber<-1>>(true)
	testType.false<IsStrictNumber<0>>(true)
	testType.false<IsStrictNumber<1>>(true)
	testType.false<IsStrictNumber<1.1>>(true)
})

it('returns false for special types', () => {
	testType.false<IsStrictNumber<void>>(true)
	testType.false<IsStrictNumber<unknown>>(true)
	testType.false<IsStrictNumber<any>>(true)
	testType.false<IsStrictNumber<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsStrictNumber<undefined>>(true)
	testType.false<IsStrictNumber<null>>(true)
	testType.false<IsStrictNumber<boolean>>(true)
	testType.false<IsStrictNumber<true>>(true)
	testType.false<IsStrictNumber<false>>(true)
	testType.false<IsStrictNumber<string>>(true)
	testType.false<IsStrictNumber<''>>(true)
	testType.false<IsStrictNumber<symbol>>(true)
	testType.false<IsStrictNumber<bigint>>(true)
	testType.false<IsStrictNumber<{}>>(true)
	testType.false<IsStrictNumber<string[]>>(true)
	testType.false<IsStrictNumber<[]>>(true)
	testType.false<IsStrictNumber<Function>>(true)
	testType.false<IsStrictNumber<() => void>>(true)
})

it('returns false if N is union of non number', () => {
	testType.false<IsStrictNumber<number | string>>(true)
})

it('returns true if N is union of number and number literal', () => {
	testType.true<IsStrictNumber<number | 1>>(true)
})

it('returns false if T is intersection of number', () => {
	testType.equal<IsStrictNumber<number & { a: 1 }>, false>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsStrictNumber<number, 1, 2>, 1>(true)
	testType.equal<IsStrictNumber<any, 1, 2>, 2>(true)
	testType.equal<IsStrictNumber<unknown, 1, 2>, 2>(true)
	testType.equal<IsStrictNumber<never, 1, 2>, 2>(true)
	testType.equal<IsStrictNumber<void, 1, 2>, 2>(true)
})

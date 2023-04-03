import { it } from '@jest/globals'
import { testType, type IsPositive } from '../index.js'

it('returns true if T is number or bigint', () => {
	testType.true<IsPositive<number>>(true)
	testType.true<IsPositive<bigint>>(true)
})

it('returns true if T is 0 or positive literals', () => {
	testType.true<IsPositive<-0>>(true)
	testType.true<IsPositive<0>>(true)
	testType.true<IsPositive<1>>(true)
	testType.true<IsPositive<2>>(true)
	testType.true<IsPositive<1.0>>(true)
	testType.true<IsPositive<1.1>>(true)

	testType.true<IsPositive<0n>>(true)
	testType.true<IsPositive<1n>>(true)
})

it('returns false if T is negative', () => {
	testType.false<IsPositive<-1>>(true)
	testType.false<IsPositive<-2>>(true)
})

it('returns boolean if T is any', () => {
	// as `any` is a union of all types,
	// including positive and negative numeric types.
	testType.equal<IsPositive<any>, boolean>(true)
})

it('returns false if T is a special type', () => {
	testType.false<IsPositive<unknown>>(true)
	testType.false<IsPositive<never>>(true)
	testType.false<IsPositive<void>>(true)
})

it('returns false for other types', () => {
	testType.false<IsPositive<undefined>>(true)
	testType.false<IsPositive<null>>(true)
	testType.false<IsPositive<boolean>>(true)
	testType.false<IsPositive<true>>(true)
	testType.false<IsPositive<false>>(true)
	testType.false<IsPositive<string>>(true)
	testType.false<IsPositive<''>>(true)
	testType.false<IsPositive<symbol>>(true)
	testType.false<IsPositive<{}>>(true)
	testType.false<IsPositive<string[]>>(true)
	testType.false<IsPositive<[]>>(true)
	testType.false<IsPositive<Function>>(true)
	testType.false<IsPositive<() => void>>(true)
})

it('returns true if T is union of positive numeric values', () => {
	testType.true<IsPositive<1 | 1.1>>(true)
	testType.true<IsPositive<1 | 1n>>(true)
	testType.true<IsPositive<1.1 | 1n>>(true)
})

it('returns boolean if T is union of mixing positive and negative value', () => {
	testType.strictBoolean<IsPositive<1 | -1>>(true)
})

it('returns false if T is union with negative numeric values', () => {
	testType.false<IsPositive<-1 | -2>>(true)
	testType.false<IsPositive<-1 | -2n>>(true)
	testType.false<IsPositive<-1n | -2n>>(true)
})

it('returns true if T is intersection of number', () => {
	testType.true<IsPositive<1 & { a: 1 }>>(true)
	testType.true<IsPositive<1n & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsPositive<1, 1, 2>, 1>(true)
	testType.equal<IsPositive<1.1, 1, 2>, 1>(true)
	testType.equal<IsPositive<1n, 1, 2>, 1>(true)

	testType.equal<IsPositive<any, 1, 2>, 1 | 2>(true)

	testType.equal<IsPositive<-2, 1, 2>, 2>(true)
	testType.equal<IsPositive<unknown, 1, 2>, 2>(true)
	testType.equal<IsPositive<never, 1, 2>, 2>(true)
	testType.equal<IsPositive<void, 1, 2>, 2>(true)
})

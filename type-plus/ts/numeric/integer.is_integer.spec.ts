import { it } from '@jest/globals'
import { testType, type IsInteger } from '../index.js'

it('returns false if N is number as it can contain float', () => {
	testType.false<IsInteger<number>>(true)
})

it('returns true if N is an integer literal', () => {
	testType.true<IsInteger<-1>>(true)
	testType.true<IsInteger<-2>>(true)
	testType.true<IsInteger<-0>>(true)
	testType.true<IsInteger<1>>(true)
	testType.true<IsInteger<2>>(true)
})

it('returns true if N is bigint as bigint can only be integer', () => {
	testType.true<IsInteger<bigint>>(true)
	testType.true<IsInteger<-1n>>(true)
	testType.true<IsInteger<-2n>>(true)
	testType.true<IsInteger<-0n>>(true)
	testType.true<IsInteger<1n>>(true)
	testType.true<IsInteger<2n>>(true)
})

it('returns false if N is a fraction', () => {
	testType.false<IsInteger<0.1>>(true)
	testType.false<IsInteger<-0.1>>(true)
})

it('returns false if N is special types', () => {
	testType.false<IsInteger<any>>(true)
	testType.false<IsInteger<unknown>>(true)
	testType.false<IsInteger<never>>(true)
	testType.false<IsInteger<void>>(true)
})

it('returns false for other types', () => {
	testType.false<IsInteger<undefined>>(true)
	testType.false<IsInteger<null>>(true)
	testType.false<IsInteger<number>>(true)
	testType.false<IsInteger<boolean>>(true)
	testType.false<IsInteger<true>>(true)
	testType.false<IsInteger<false>>(true)
	testType.false<IsInteger<string>>(true)
	testType.false<IsInteger<''>>(true)
	testType.false<IsInteger<symbol>>(true)
	testType.false<IsInteger<{}>>(true)
	testType.false<IsInteger<string[]>>(true)
	testType.false<IsInteger<[]>>(true)
	testType.false<IsInteger<Function>>(true)
	testType.false<IsInteger<() => void>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsInteger<-1, 1, 2>, 1>(true)
	testType.equal<IsInteger<1.1, 1, 2>, 2>(true)

	testType.equal<IsInteger<any, 1, 2>, 2>(true)
	testType.equal<IsInteger<unknown, 1, 2>, 2>(true)
	testType.equal<IsInteger<never, 1, 2>, 2>(true)
	testType.equal<IsInteger<void, 1, 2>, 2>(true)
})

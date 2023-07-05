import { it } from '@jest/globals'
import { testType, type IsNotTuple } from '../index.js'

it('returns false if T is a tuple', () => {
	testType.false<IsNotTuple<[]>>(true)
	testType.false<IsNotTuple<[1]>>(true)
})

it('returns true if T is an array', () => {
	testType.true<IsNotTuple<string[]>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotTuple<void>>(true)
	testType.true<IsNotTuple<unknown>>(true)
	testType.true<IsNotTuple<any>>(true)
	testType.true<IsNotTuple<never>>(true)
})

it('returns true if T for other types', () => {
	testType.true<IsNotTuple<undefined>>(true)
	testType.true<IsNotTuple<null>>(true)
	testType.true<IsNotTuple<boolean>>(true)
	testType.true<IsNotTuple<true>>(true)
	testType.true<IsNotTuple<false>>(true)
	testType.true<IsNotTuple<number>>(true)
	testType.true<IsNotTuple<1>>(true)
	testType.true<IsNotTuple<string>>(true)
	testType.true<IsNotTuple<''>>(true)
	testType.true<IsNotTuple<symbol>>(true)
	testType.true<IsNotTuple<bigint>>(true)
	testType.true<IsNotTuple<1n>>(true)
	testType.true<IsNotTuple<{}>>(true)
	testType.true<IsNotTuple<string[]>>(true)
	testType.true<IsNotTuple<Function>>(true)
	testType.true<IsNotTuple<() => void>>(true)
})

it('returns true if T is an union of tuple and other types', () => {
	testType.true<IsNotTuple<[1] | string>>(true)
})

it('returns false if T is union of tuples', () => {
	testType.false<IsNotTuple<[] | [1]>>(true)
})

it('returns false if T is intersection of tuples', () => {
	testType.equal<IsNotTuple<[] & { a: 1 }>, false>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotTuple<[], 1, 2>, 2>(true)
	testType.equal<IsNotTuple<string[], 1, 2>, 1>(true)

	testType.equal<IsNotTuple<any, 1, 2>, 1>(true)
	testType.equal<IsNotTuple<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotTuple<never, 1, 2>, 1>(true)
	testType.equal<IsNotTuple<void, 1, 2>, 1>(true)
})

it('can override never case', () => {
	testType.equal<IsNotTuple<never, 1, 2, { caseNever: 3 }>, 3>(true)
})

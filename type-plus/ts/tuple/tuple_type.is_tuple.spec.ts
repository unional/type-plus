import { it } from '@jest/globals'
import { testType, type IsTuple } from '../index.js'

it('returns true if T is a tuple', () => {
	testType.true<IsTuple<[]>>(true)
	testType.true<IsTuple<[1]>>(true)
})

it('returns false if T is an array', () => {
	testType.false<IsTuple<string[]>>(true)
})

it('returns false for special types', () => {
	testType.false<IsTuple<void>>(true)
	testType.false<IsTuple<unknown>>(true)
	testType.false<IsTuple<any>>(true)
	testType.false<IsTuple<never>>(true)
})

it('returns false if T for other types', () => {
	testType.false<IsTuple<undefined>>(true)
	testType.false<IsTuple<null>>(true)
	testType.false<IsTuple<boolean>>(true)
	testType.false<IsTuple<true>>(true)
	testType.false<IsTuple<false>>(true)
	testType.false<IsTuple<number>>(true)
	testType.false<IsTuple<1>>(true)
	testType.false<IsTuple<string>>(true)
	testType.false<IsTuple<''>>(true)
	testType.false<IsTuple<symbol>>(true)
	testType.false<IsTuple<bigint>>(true)
	testType.false<IsTuple<1n>>(true)
	testType.false<IsTuple<{}>>(true)
	testType.false<IsTuple<string[]>>(true)
	testType.false<IsTuple<Function>>(true)
	testType.false<IsTuple<() => void>>(true)
})

it('returns false if T is an union of tuple and other types', () => {
	testType.false<IsTuple<[1] | string>>(true)
})

it('returns true if T is union of tuples', () => {
	testType.true<IsTuple<[] | [1]>>(true)
})

it('returns true if T is intersection of tuples', () => {
	testType.equal<IsTuple<[] & { a: 1 }>, true>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsTuple<[], 1, 2>, 1>(true)
	testType.equal<IsTuple<string[], 1, 2>, 2>(true)

	testType.equal<IsTuple<any, 1, 2>, 2>(true)
	testType.equal<IsTuple<unknown, 1, 2>, 2>(true)
	testType.equal<IsTuple<never, 1, 2>, 2>(true)
	testType.equal<IsTuple<void, 1, 2>, 2>(true)
})

it('can override never case', () => {
	testType.equal<IsTuple<never, 1, 2, { never: 3 }>, 3>(true)
})

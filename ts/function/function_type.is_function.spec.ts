import { it } from '@jest/globals'
import { testType, type AnyFunction, type IsFunction } from '../index.js'

it('returns true if T is Function', () => {
	testType.true<IsFunction<Function>>(true)
})

it('returns true if T is function signature', () => {
	testType.true<IsFunction<() => void>>(true)
	testType.true<IsFunction<AnyFunction>>(true)
})

it('returns false for special types', () => {
	testType.false<IsFunction<void>>(true)
	testType.false<IsFunction<unknown>>(true)
	testType.false<IsFunction<any>>(true)
	testType.false<IsFunction<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsFunction<undefined>>(true)
	testType.false<IsFunction<null>>(true)
	testType.false<IsFunction<boolean>>(true)
	testType.false<IsFunction<true>>(true)
	testType.false<IsFunction<false>>(true)
	testType.false<IsFunction<number>>(true)
	testType.false<IsFunction<1>>(true)
	testType.false<IsFunction<string>>(true)
	testType.false<IsFunction<''>>(true)
	testType.false<IsFunction<symbol>>(true)
	testType.false<IsFunction<bigint>>(true)
	testType.false<IsFunction<1n>>(true)
	testType.false<IsFunction<{}>>(true)
	testType.false<IsFunction<{ a: 1 }>>(true)
	testType.false<IsFunction<string[]>>(true)
	testType.false<IsFunction<[]>>(true)
})

it('returns false if T is union of function', () => {
	testType.false<IsFunction<Function | { a: 1 }>>(true)
})

it('returns true if T is function overloads', () => {
	testType.true<IsFunction<{ (): void; (x: number): number }>>(true)
})

it('returns true if T is intersection of function', () => {
	testType.true<IsFunction<Function & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsFunction<Function, 1, 2>, 1>(true)

	testType.equal<IsFunction<any, 1, 2>, 2>(true)
	testType.equal<IsFunction<unknown, 1, 2>, 2>(true)
	testType.equal<IsFunction<never, 1, 2>, 2>(true)
	testType.equal<IsFunction<void, 1, 2>, 2>(true)
})

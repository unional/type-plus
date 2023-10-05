import { it } from '@jest/globals'
import { testType, type IsObject } from '../index.js'

it('returns true if T is object', () => {
	testType.true<IsObject<object>>(true)
})

it('returns true if T is object literal', () => {
	testType.true<IsObject<{}>>(true)
	testType.true<IsObject<{ a: 1 }>>(true)
})

it('returns true if T is function as function is a subtype of object', () => {
	testType.true<IsObject<Function>>(true)
	testType.true<IsObject<() => void>>(true)
})

it('returns true if T is array or tuple', () => {
	testType.true<IsObject<string[]>>(true)
	testType.true<IsObject<[]>>(true)
	testType.true<IsObject<[1, 2]>>(true)
})

it('returns false for special types', () => {
	testType.false<IsObject<void>>(true)
	testType.false<IsObject<unknown>>(true)
	testType.false<IsObject<any>>(true)
	testType.false<IsObject<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsObject<undefined>>(true)
	testType.false<IsObject<null>>(true)
	testType.false<IsObject<boolean>>(true)
	testType.false<IsObject<true>>(true)
	testType.false<IsObject<false>>(true)
	testType.false<IsObject<number>>(true)
	testType.false<IsObject<1>>(true)
	testType.false<IsObject<string>>(true)
	testType.false<IsObject<''>>(true)
	testType.false<IsObject<symbol>>(true)
	testType.false<IsObject<bigint>>(true)
	testType.false<IsObject<1n>>(true)
})

it('returns false if T is union of object', () => {
	testType.false<IsObject<object | 1>>(true)
})

it('returns true if T is intersection of object', () => {
	testType.true<IsObject<object & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsObject<object, 1, 2>, 1>(true)
	testType.equal<IsObject<0, 1, 2>, 2>(true)

	testType.equal<IsObject<any, 1, 2>, 2>(true)
	testType.equal<IsObject<unknown, 1, 2>, 2>(true)
	testType.equal<IsObject<never, 1, 2>, 2>(true)
	testType.equal<IsObject<void, 1, 2>, 2>(true)
})

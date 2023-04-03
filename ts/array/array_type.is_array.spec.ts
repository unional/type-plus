import { it } from '@jest/globals'
import { testType, type IsArray } from '../index.js'

it('returns true if T is array', () => {
	testType.true<IsArray<string[]>>(true)
})

it('returns false if T is tuple', () => {
	testType.false<IsArray<[]>>(true)
	testType.false<IsArray<[1]>>(true)
})

it('returns false for special types', () => {
	testType.false<IsArray<void>>(true)
	testType.false<IsArray<unknown>>(true)
	testType.false<IsArray<any>>(true)
	testType.false<IsArray<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsArray<undefined>>(true)
	testType.false<IsArray<null>>(true)
	testType.false<IsArray<boolean>>(true)
	testType.false<IsArray<true>>(true)
	testType.false<IsArray<false>>(true)
	testType.false<IsArray<number>>(true)
	testType.false<IsArray<1>>(true)
	testType.false<IsArray<string>>(true)
	testType.false<IsArray<''>>(true)
	testType.false<IsArray<symbol>>(true)
	testType.false<IsArray<bigint>>(true)
	testType.false<IsArray<1n>>(true)
	testType.false<IsArray<{}>>(true)
	testType.false<IsArray<{ a: 1 }>>(true)
	testType.false<IsArray<[]>>(true)
	testType.false<IsArray<Function>>(true)
	testType.false<IsArray<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsArray<number[] | 1>>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsArray<number[] & 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsArray<string[], 1, 2>, 1>(true)
	testType.equal<IsArray<[], 1, 2>, 2>(true)

	testType.equal<IsArray<any, 1, 2>, 2>(true)
	testType.equal<IsArray<unknown, 1, 2>, 2>(true)
	testType.equal<IsArray<never, 1, 2>, 2>(true)
	testType.equal<IsArray<void, 1, 2>, 2>(true)
})

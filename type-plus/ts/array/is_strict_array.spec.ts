import { it } from '@jest/globals'

import { type IsStrictArray,testType } from '../index.js'

it('returns true if T is array', () => {
	testType.true<IsStrictArray<string[]>>(true)
})

it('returns false if T is tuple', () => {
	testType.false<IsStrictArray<[]>>(true)
	testType.false<IsStrictArray<[1]>>(true)
})

it('returns false for special types', () => {
	testType.false<IsStrictArray<void>>(true)
	testType.false<IsStrictArray<unknown>>(true)
	testType.false<IsStrictArray<any>>(true)
	testType.false<IsStrictArray<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsStrictArray<undefined>>(true)
	testType.false<IsStrictArray<null>>(true)
	testType.false<IsStrictArray<boolean>>(true)
	testType.false<IsStrictArray<true>>(true)
	testType.false<IsStrictArray<false>>(true)
	testType.false<IsStrictArray<number>>(true)
	testType.false<IsStrictArray<1>>(true)
	testType.false<IsStrictArray<string>>(true)
	testType.false<IsStrictArray<''>>(true)
	testType.false<IsStrictArray<symbol>>(true)
	testType.false<IsStrictArray<bigint>>(true)
	testType.false<IsStrictArray<1n>>(true)
	testType.false<IsStrictArray<{}>>(true)
	testType.false<IsStrictArray<{ a: 1 }>>(true)
	testType.false<IsStrictArray<[]>>(true)
	testType.false<IsStrictArray<Function>>(true)
	testType.false<IsStrictArray<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsStrictArray<number[] | 1>>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsStrictArray<number[] & 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsStrictArray<string[], 1, 2>, 1>(true)
	testType.equal<IsStrictArray<[], 1, 2>, 2>(true)

	testType.equal<IsStrictArray<any, 1, 2>, 2>(true)
	testType.equal<IsStrictArray<unknown, 1, 2>, 2>(true)
	testType.equal<IsStrictArray<never, 1, 2>, 2>(true)
	testType.equal<IsStrictArray<void, 1, 2>, 2>(true)
})

it('supports readonly array', () => {
	testType.true<IsStrictArray<readonly string[]>>(true)
})

import { it } from '@jest/globals'
import { testType, type IsNotStrictArray } from '../index.js'

it('returns false if T is array', () => {
	testType.false<IsNotStrictArray<string[]>>(true)
})

it('returns true if T is tuple', () => {
	testType.true<IsNotStrictArray<[]>>(true)
	testType.true<IsNotStrictArray<[1]>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotStrictArray<void>>(true)
	testType.true<IsNotStrictArray<unknown>>(true)
	testType.true<IsNotStrictArray<any>>(true)
	testType.true<IsNotStrictArray<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotStrictArray<undefined>>(true)
	testType.true<IsNotStrictArray<null>>(true)
	testType.true<IsNotStrictArray<boolean>>(true)
	testType.true<IsNotStrictArray<true>>(true)
	testType.true<IsNotStrictArray<false>>(true)
	testType.true<IsNotStrictArray<number>>(true)
	testType.true<IsNotStrictArray<1>>(true)
	testType.true<IsNotStrictArray<string>>(true)
	testType.true<IsNotStrictArray<''>>(true)
	testType.true<IsNotStrictArray<symbol>>(true)
	testType.true<IsNotStrictArray<bigint>>(true)
	testType.true<IsNotStrictArray<1n>>(true)
	testType.true<IsNotStrictArray<{}>>(true)
	testType.true<IsNotStrictArray<{ a: 1 }>>(true)
	testType.true<IsNotStrictArray<[]>>(true)
	testType.true<IsNotStrictArray<Function>>(true)
	testType.true<IsNotStrictArray<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotStrictArray<number[] | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsNotStrictArray<number[] & 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotStrictArray<string[], 1, 2>, 2>(true)
	testType.equal<IsNotStrictArray<[], 1, 2>, 1>(true)

	testType.equal<IsNotStrictArray<any, 1, 2>, 1>(true)
	testType.equal<IsNotStrictArray<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotStrictArray<never, 1, 2>, 1>(true)
	testType.equal<IsNotStrictArray<void, 1, 2>, 1>(true)
})

it('supports readonly array', () => {
	testType.true<IsNotStrictArray<readonly [1]>>(true)
})

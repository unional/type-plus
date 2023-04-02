import { testType, type IsNotArray } from '../index.js'

it('returns false if T is array', () => {
	testType.false<IsNotArray<string[]>>(true)
})

it('returns true if T is tuple', () => {
	testType.true<IsNotArray<[]>>(true)
	testType.true<IsNotArray<[1]>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotArray<void>>(true)
	testType.true<IsNotArray<unknown>>(true)
	testType.true<IsNotArray<any>>(true)
	testType.true<IsNotArray<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotArray<undefined>>(true)
	testType.true<IsNotArray<null>>(true)
	testType.true<IsNotArray<boolean>>(true)
	testType.true<IsNotArray<true>>(true)
	testType.true<IsNotArray<false>>(true)
	testType.true<IsNotArray<number>>(true)
	testType.true<IsNotArray<1>>(true)
	testType.true<IsNotArray<string>>(true)
	testType.true<IsNotArray<''>>(true)
	testType.true<IsNotArray<symbol>>(true)
	testType.true<IsNotArray<bigint>>(true)
	testType.true<IsNotArray<1n>>(true)
	testType.true<IsNotArray<{}>>(true)
	testType.true<IsNotArray<{ a: 1 }>>(true)
	testType.true<IsNotArray<[]>>(true)
	testType.true<IsNotArray<Function>>(true)
	testType.true<IsNotArray<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotArray<number[] | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsNotArray<number[] & 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotArray<string[], 1, 2>, 2>(true)
	testType.equal<IsNotArray<[], 1, 2>, 1>(true)

	testType.equal<IsNotArray<any, 1, 2>, 1>(true)
	testType.equal<IsNotArray<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotArray<never, 1, 2>, 1>(true)
	testType.equal<IsNotArray<void, 1, 2>, 1>(true)
})

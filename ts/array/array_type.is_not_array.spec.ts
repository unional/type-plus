import { type, type IsNotArray } from '../index.js'

it('returns false if T is array', () => {
	type.false<IsNotArray<string[]>>(true)
})

it('returns true if T is tuple', () => {
	type.true<IsNotArray<[]>>(true)
	type.true<IsNotArray<[1]>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotArray<void>>(true)
	type.true<IsNotArray<unknown>>(true)
	type.true<IsNotArray<any>>(true)
	type.true<IsNotArray<never>>(true)
})

it('returns true for other types', () => {
	type.true<IsNotArray<undefined>>(true)
	type.true<IsNotArray<null>>(true)
	type.true<IsNotArray<boolean>>(true)
	type.true<IsNotArray<true>>(true)
	type.true<IsNotArray<false>>(true)
	type.true<IsNotArray<number>>(true)
	type.true<IsNotArray<1>>(true)
	type.true<IsNotArray<string>>(true)
	type.true<IsNotArray<''>>(true)
	type.true<IsNotArray<symbol>>(true)
	type.true<IsNotArray<bigint>>(true)
	type.true<IsNotArray<1n>>(true)
	type.true<IsNotArray<{}>>(true)
	type.true<IsNotArray<{ a: 1 }>>(true)
	type.true<IsNotArray<[]>>(true)
	type.true<IsNotArray<Function>>(true)
	type.true<IsNotArray<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotArray<number[] | 1>>(true)
})

it('returns false for intersection type', () => {
	type.false<IsNotArray<number[] & 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotArray<string[], 1, 2>, 2>(true)
	type.equal<IsNotArray<[], 1, 2>, 1>(true)

	type.equal<IsNotArray<any, 1, 2>, 1>(true)
	type.equal<IsNotArray<unknown, 1, 2>, 1>(true)
	type.equal<IsNotArray<never, 1, 2>, 1>(true)
	type.equal<IsNotArray<void, 1, 2>, 1>(true)
})

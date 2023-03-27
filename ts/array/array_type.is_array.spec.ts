import { type, type IsArray } from '../index.js'

it('returns true if T is array', () => {
	type.true<IsArray<string[]>>(true)
})

it('returns false if T is tuple', () => {
	type.false<IsArray<[]>>(true)
	type.false<IsArray<[1]>>(true)
})

it('returns false for special types', () => {
	type.false<IsArray<void>>(true)
	type.false<IsArray<unknown>>(true)
	type.false<IsArray<any>>(true)
	type.false<IsArray<never>>(true)
})

it('returns false for other types', () => {
	type.false<IsArray<undefined>>(true)
	type.false<IsArray<null>>(true)
	type.false<IsArray<boolean>>(true)
	type.false<IsArray<true>>(true)
	type.false<IsArray<false>>(true)
	type.false<IsArray<number>>(true)
	type.false<IsArray<1>>(true)
	type.false<IsArray<string>>(true)
	type.false<IsArray<''>>(true)
	type.false<IsArray<symbol>>(true)
	type.false<IsArray<bigint>>(true)
	type.false<IsArray<1n>>(true)
	type.false<IsArray<{}>>(true)
	type.false<IsArray<{ a: 1 }>>(true)
	type.false<IsArray<[]>>(true)
	type.false<IsArray<Function>>(true)
	type.false<IsArray<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsArray<number[] | 1>>(true)
})

it('returns false for intersection type', () => {
	type.false<IsArray<number[] & 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsArray<string[], 1, 2>, 1>(true)
	type.equal<IsArray<[], 1, 2>, 2>(true)

	type.equal<IsArray<any, 1, 2>, 2>(true)
	type.equal<IsArray<unknown, 1, 2>, 2>(true)
	type.equal<IsArray<never, 1, 2>, 2>(true)
	type.equal<IsArray<void, 1, 2>, 2>(true)
})

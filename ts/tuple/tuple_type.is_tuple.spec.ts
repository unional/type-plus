import { type, type IsTuple } from '../index.js'

it('returns true if T is a tuple', () => {
	type.true<IsTuple<[]>>(true)
	type.true<IsTuple<[1]>>(true)
})

it('returns false if T is an array', () => {
	type.false<IsTuple<string[]>>(true)
})

it('returns false for special types', () => {
	type.false<IsTuple<void>>(true)
	type.false<IsTuple<unknown>>(true)
	type.false<IsTuple<any>>(true)
	type.false<IsTuple<never>>(true)
})

it('returns false if T for other types', () => {
	type.false<IsTuple<undefined>>(true)
	type.false<IsTuple<null>>(true)
	type.false<IsTuple<boolean>>(true)
	type.false<IsTuple<true>>(true)
	type.false<IsTuple<false>>(true)
	type.false<IsTuple<number>>(true)
	type.false<IsTuple<1>>(true)
	type.false<IsTuple<string>>(true)
	type.false<IsTuple<''>>(true)
	type.false<IsTuple<symbol>>(true)
	type.false<IsTuple<bigint>>(true)
	type.false<IsTuple<1n>>(true)
	type.false<IsTuple<{}>>(true)
	type.false<IsTuple<string[]>>(true)
	type.false<IsTuple<Function>>(true)
	type.false<IsTuple<() => void>>(true)
})

it('returns false if T is an union of tuple and other types', () => {
	type.false<IsTuple<[1] | string>>(true)
})

it('returns true if T is union of tuples', () => {
	type.true<IsTuple<[] | [1]>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsTuple<[], 1, 2>, 1>(true)
	type.equal<IsTuple<string[], 1, 2>, 2>(true)

	type.equal<IsTuple<any, 1, 2>, 2>(true)
	type.equal<IsTuple<unknown, 1, 2>, 2>(true)
	type.equal<IsTuple<never, 1, 2>, 2>(true)
	type.equal<IsTuple<void, 1, 2>, 2>(true)
})

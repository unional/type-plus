import { type, type IsNotTuple } from '../index.js'

it('returns false if T is a tuple', () => {
	type.false<IsNotTuple<[]>>(true)
	type.false<IsNotTuple<[1]>>(true)
})

it('returns true if T is an array', () => {
	type.true<IsNotTuple<string[]>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotTuple<void>>(true)
	type.true<IsNotTuple<unknown>>(true)
	type.true<IsNotTuple<any>>(true)
	type.true<IsNotTuple<never>>(true)
})

it('returns true if T for other types', () => {
	type.true<IsNotTuple<undefined>>(true)
	type.true<IsNotTuple<null>>(true)
	type.true<IsNotTuple<boolean>>(true)
	type.true<IsNotTuple<true>>(true)
	type.true<IsNotTuple<false>>(true)
	type.true<IsNotTuple<number>>(true)
	type.true<IsNotTuple<1>>(true)
	type.true<IsNotTuple<string>>(true)
	type.true<IsNotTuple<''>>(true)
	type.true<IsNotTuple<symbol>>(true)
	type.true<IsNotTuple<bigint>>(true)
	type.true<IsNotTuple<1n>>(true)
	type.true<IsNotTuple<{}>>(true)
	type.true<IsNotTuple<string[]>>(true)
	type.true<IsNotTuple<Function>>(true)
	type.true<IsNotTuple<() => void>>(true)
})

it('returns true if T is an union of tuple and other types', () => {
	type.true<IsNotTuple<[1] | string>>(true)
})

it('returns false if T is union of tuples', () => {
	type.false<IsNotTuple<[] | [1]>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotTuple<[], 1, 2>, 2>(true)
	type.equal<IsNotTuple<string[], 1, 2>, 1>(true)

	type.equal<IsNotTuple<any, 1, 2>, 1>(true)
	type.equal<IsNotTuple<unknown, 1, 2>, 1>(true)
	type.equal<IsNotTuple<never, 1, 2>, 1>(true)
	type.equal<IsNotTuple<void, 1, 2>, 1>(true)
})

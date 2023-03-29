import { type, type IsObject } from '../index.js'

it('returns true if T is object', () => {
	type.true<IsObject<object>>(true)
})

it('returns true if T is object literal', () => {
	type.true<IsObject<{}>>(true)
	type.true<IsObject<{ a: 1 }>>(true)
})

it('returns true if T is function as function is a subtype of object', () => {
	type.true<IsObject<Function>>(true)
	type.true<IsObject<() => void>>(true)
})

it('returns true if T is array or tuple', () => {
	type.true<IsObject<string[]>>(true)
	type.true<IsObject<[]>>(true)
	type.true<IsObject<[1, 2]>>(true)
})

it('returns false for special types', () => {
	type.false<IsObject<void>>(true)
	type.false<IsObject<unknown>>(true)
	type.false<IsObject<any>>(true)
	type.false<IsObject<never>>(true)
})

it('returns false for all other types', () => {
	type.false<IsObject<undefined>>(true)
	type.false<IsObject<null>>(true)
	type.false<IsObject<boolean>>(true)
	type.false<IsObject<true>>(true)
	type.false<IsObject<false>>(true)
	type.false<IsObject<number>>(true)
	type.false<IsObject<1>>(true)
	type.false<IsObject<string>>(true)
	type.false<IsObject<''>>(true)
	type.false<IsObject<symbol>>(true)
	type.false<IsObject<bigint>>(true)
	type.false<IsObject<1n>>(true)
})

it('returns false if T is union of object', () => {
	type.false<IsObject<object | 1>>(true)
})

it('returns true if T is intersection of object', () => {
	type.true<IsObject<object & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsObject<object, 1, 2>, 1>(true)
	type.equal<IsObject<0, 1, 2>, 2>(true)

	type.equal<IsObject<any, 1, 2>, 2>(true)
	type.equal<IsObject<unknown, 1, 2>, 2>(true)
	type.equal<IsObject<never, 1, 2>, 2>(true)
	type.equal<IsObject<void, 1, 2>, 2>(true)
})

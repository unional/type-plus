import { type, type IsNotObject } from '../index.js'

it('returns false if T is object', () => {
	type.false<IsNotObject<object>>(true)
})

it('returns false if T is object literal', () => {
	type.false<IsNotObject<{}>>(true)
	type.false<IsNotObject<{ a: 1 }>>(true)
})

it('returns false if T is function as function is a subtype of object', () => {
	type.false<IsNotObject<Function>>(true)
	type.false<IsNotObject<() => void>>(true)
})

it('returns false if T is array or tuple', () => {
	type.false<IsNotObject<string[]>>(true)
	type.false<IsNotObject<[]>>(true)
	type.false<IsNotObject<[1, 2]>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotObject<void>>(true)
	type.true<IsNotObject<unknown>>(true)
	type.true<IsNotObject<any>>(true)
	type.true<IsNotObject<never>>(true)
})

it('returns true for all other types', () => {
	type.true<IsNotObject<undefined>>(true)
	type.true<IsNotObject<null>>(true)
	type.true<IsNotObject<boolean>>(true)
	type.true<IsNotObject<true>>(true)
	type.true<IsNotObject<false>>(true)
	type.true<IsNotObject<number>>(true)
	type.true<IsNotObject<1>>(true)
	type.true<IsNotObject<string>>(true)
	type.true<IsNotObject<''>>(true)
	type.true<IsNotObject<symbol>>(true)
	type.true<IsNotObject<bigint>>(true)
	type.true<IsNotObject<1n>>(true)
})

it('returns true if T is union of object', () => {
	type.true<IsNotObject<object | 1>>(true)
})

it('returns false if T is intersection of object', () => {
	type.false<IsNotObject<object & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotObject<object, 1, 2>, 2>(true)
	type.equal<IsNotObject<0, 1, 2>, 1>(true)

	type.equal<IsNotObject<any, 1, 2>, 1>(true)
	type.equal<IsNotObject<unknown, 1, 2>, 1>(true)
	type.equal<IsNotObject<never, 1, 2>, 1>(true)
	type.equal<IsNotObject<void, 1, 2>, 1>(true)
})

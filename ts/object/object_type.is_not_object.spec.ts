import { testType, type IsNotObject } from '../index.js'

it('returns false if T is object', () => {
	testType.false<IsNotObject<object>>(true)
})

it('returns false if T is object literal', () => {
	testType.false<IsNotObject<{}>>(true)
	testType.false<IsNotObject<{ a: 1 }>>(true)
})

it('returns false if T is function as function is a subtype of object', () => {
	testType.false<IsNotObject<Function>>(true)
	testType.false<IsNotObject<() => void>>(true)
})

it('returns false if T is array or tuple', () => {
	testType.false<IsNotObject<string[]>>(true)
	testType.false<IsNotObject<[]>>(true)
	testType.false<IsNotObject<[1, 2]>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotObject<void>>(true)
	testType.true<IsNotObject<unknown>>(true)
	testType.true<IsNotObject<any>>(true)
	testType.true<IsNotObject<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotObject<undefined>>(true)
	testType.true<IsNotObject<null>>(true)
	testType.true<IsNotObject<boolean>>(true)
	testType.true<IsNotObject<true>>(true)
	testType.true<IsNotObject<false>>(true)
	testType.true<IsNotObject<number>>(true)
	testType.true<IsNotObject<1>>(true)
	testType.true<IsNotObject<string>>(true)
	testType.true<IsNotObject<''>>(true)
	testType.true<IsNotObject<symbol>>(true)
	testType.true<IsNotObject<bigint>>(true)
	testType.true<IsNotObject<1n>>(true)
})

it('returns true if T is union of object', () => {
	testType.true<IsNotObject<object | 1>>(true)
})

it('returns false if T is intersection of object', () => {
	testType.false<IsNotObject<object & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotObject<object, 1, 2>, 2>(true)
	testType.equal<IsNotObject<0, 1, 2>, 1>(true)

	testType.equal<IsNotObject<any, 1, 2>, 1>(true)
	testType.equal<IsNotObject<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotObject<never, 1, 2>, 1>(true)
	testType.equal<IsNotObject<void, 1, 2>, 1>(true)
})

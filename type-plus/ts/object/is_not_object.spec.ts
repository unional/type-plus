import { it } from '@jest/globals'

import { type $Else, type $Then, type IsNotObject,testType } from '../index.js'

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

it('distributes over union type', () => {
	testType.equal<IsNotObject<object | 1>, boolean>(true)
	testType.equal<IsNotObject<{ a: 1 } | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotObject<{ a: 1 } | 1>, boolean>(true)
	testType.equal<IsNotObject<{ a: 1 } | 1, { distributive: false }>, true>(true)
})

it('returns false for intersection type', () => {
	testType.equal<object & [], object & []>(true)
	testType.false<IsNotObject<object & []>>(true)
	testType.false<IsNotObject<{ a: 1 } & []>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotObject<object, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotObject<{ a: 1 }, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotObject<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotObject<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotObject<object | boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsNotObject<{ a: 1 } | 1n, { selection: 'filter' }>, 1n>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotObject<object, IsNotObject.$Branch>, $Else>(true)
	testType.equal<IsNotObject<{ a: 1 }, IsNotObject.$Branch>, $Else>(true)

	testType.equal<IsNotObject<any, IsNotObject.$Branch>, $Then>(true)
	testType.equal<IsNotObject<unknown, IsNotObject.$Branch>, $Then>(true)
	testType.equal<IsNotObject<never, IsNotObject.$Branch>, $Then>(true)
	testType.equal<IsNotObject<void, IsNotObject.$Branch>, $Then>(true)

	testType.equal<IsNotObject<object | 1, IsNotObject.$Branch>, $Then | $Else>(true)
})

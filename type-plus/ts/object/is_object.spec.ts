import { it } from '@jest/globals'

import { type $Else,type $Then, type IsObject, testType } from '../index.js'

it('returns true if T is object', () => {
	testType.true<IsObject<object>>(true)
})

it('returns true if T is object literal', () => {
	testType.true<IsObject<{}>>(true)
	testType.true<IsObject<{ a: 1 }>>(true)
})

it('returns true if T is function as function is a subtype of object', () => {
	testType.true<IsObject<Function>>(true)
	testType.true<IsObject<() => void>>(true)
})

it('returns true if T is array or tuple', () => {
	testType.true<IsObject<string[]>>(true)
	testType.true<IsObject<[]>>(true)
	testType.true<IsObject<[1, 2]>>(true)
})

it('returns false for special types', () => {
	testType.false<IsObject<void>>(true)
	testType.false<IsObject<unknown>>(true)
	testType.false<IsObject<any>>(true)
	testType.false<IsObject<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsObject<undefined>>(true)
	testType.false<IsObject<null>>(true)
	testType.false<IsObject<boolean>>(true)
	testType.false<IsObject<true>>(true)
	testType.false<IsObject<false>>(true)
	testType.false<IsObject<number>>(true)
	testType.false<IsObject<1>>(true)
	testType.false<IsObject<string>>(true)
	testType.false<IsObject<''>>(true)
	testType.false<IsObject<symbol>>(true)
	testType.false<IsObject<bigint>>(true)
	testType.false<IsObject<1n>>(true)
})

it('distributes for union type', () => {
	testType.equal<IsObject<object | 1>, boolean>(true)
	testType.equal<IsObject<{ a: 1 } | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsObject<{ a: 1 } | 1>, boolean>(true)
	testType.equal<IsObject<{ a: 1 } | 1, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<object & [], object & []>(true)
	testType.true<IsObject<object & []>>(true)
	testType.true<IsObject<{ a: 1 } & []>>(true)
})

it('works as filter', () => {
	testType.equal<IsObject<object, { selection: 'filter' }>, object>(true)
	testType.equal<IsObject<{ a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)

	testType.equal<IsObject<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsObject<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsObject<object | boolean, { selection: 'filter' }>, object>(true)
	testType.equal<IsObject<{ a: 1 } | boolean, { selection: 'filter' }>, { a: 1 }>(true)
})

it('works with unique branches', () => {
	testType.equal<IsObject<object, IsObject.$Branch>, $Then>(true)
	testType.equal<IsObject<{ a: 1 }, IsObject.$Branch>, $Then>(true)

	testType.equal<IsObject<any, IsObject.$Branch>, $Else>(true)
	testType.equal<IsObject<unknown, IsObject.$Branch>, $Else>(true)
	testType.equal<IsObject<never, IsObject.$Branch>, $Else>(true)
	testType.equal<IsObject<void, IsObject.$Branch>, $Else>(true)

	testType.equal<IsObject<object | 1, IsObject.$Branch>, $Then | $Else>(true)
})

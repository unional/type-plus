import { it } from '@jest/globals'

import { type $Else, type $Then,type IsNotNumber, testType } from '../index.js'

it('returns false for number', () => {
	testType.false<IsNotNumber<number>>(true)
})

it('returns false if T is number literial', () => {
	testType.false<IsNotNumber<-1>>(true)
	testType.false<IsNotNumber<0>>(true)
	testType.false<IsNotNumber<1>>(true)
	testType.false<IsNotNumber<1.1>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotNumber<void>>(true)
	testType.true<IsNotNumber<unknown>>(true)
	testType.true<IsNotNumber<any>>(true)
	testType.true<IsNotNumber<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotNumber<undefined>>(true)
	testType.true<IsNotNumber<null>>(true)
	testType.true<IsNotNumber<boolean>>(true)
	testType.true<IsNotNumber<true>>(true)
	testType.true<IsNotNumber<true>>(true)
	testType.true<IsNotNumber<string>>(true)
	testType.true<IsNotNumber<''>>(true)
	testType.true<IsNotNumber<symbol>>(true)
	testType.true<IsNotNumber<bigint>>(true)
	testType.true<IsNotNumber<{}>>(true)
	testType.true<IsNotNumber<string[]>>(true)
	testType.true<IsNotNumber<[]>>(true)
	testType.true<IsNotNumber<Function>>(true)
	testType.true<IsNotNumber<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotNumber<number | string>, boolean>(true)
})

it('returns false if N is union of number and number literal', () => {
	testType.equal<IsNotNumber<number | 1>, false>(true)
})

it('returns false if T is intersection of number, as that is still considered a number', () => {
	testType.equal<IsNotNumber<number & { a: 1 }>, false>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotNumber<1n | 1>, boolean>(true)
	testType.equal<IsNotNumber<1n | 1, { distributive: false }>, true>(true)
	testType.true<IsNotNumber<number | string, { distributive: false }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotNumber<number, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNumber<1, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotNumber<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNumber<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotNumber<string | boolean, { selection: 'filter' }>, string | boolean>(true)

	testType.equal<IsNotNumber<string | 1, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotNumber<number, IsNotNumber.$Branch>, $Else>(true)
	testType.equal<IsNotNumber<1, IsNotNumber.$Branch>, $Else>(true)

	testType.equal<IsNotNumber<any, IsNotNumber.$Branch>, $Then>(true)
	testType.equal<IsNotNumber<unknown, IsNotNumber.$Branch>, $Then>(true)
	testType.equal<IsNotNumber<never, IsNotNumber.$Branch>, $Then>(true)
	testType.equal<IsNotNumber<void, IsNotNumber.$Branch>, $Then>(true)

	testType.equal<IsNotNumber<1n | 1, IsNotNumber.$Branch>, $Then | $Else>(true)
})

import { it } from '@jest/globals'

import { type $Else,type $Then, type IsNumber, testType } from '../index.js'

it('returns true for number', () => {
	testType.true<IsNumber<number>>(true)
})

it('returns true if T is number literial', () => {
	testType.true<IsNumber<-1>>(true)
	testType.true<IsNumber<0>>(true)
	testType.true<IsNumber<1>>(true)
	testType.true<IsNumber<1.1>>(true)
})

it('returns false for special types', () => {
	testType.false<IsNumber<void>>(true)
	testType.false<IsNumber<unknown>>(true)
	testType.false<IsNumber<any>>(true)
	testType.false<IsNumber<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsNumber<undefined>>(true)
	testType.false<IsNumber<null>>(true)
	testType.false<IsNumber<boolean>>(true)
	testType.false<IsNumber<true>>(true)
	testType.false<IsNumber<false>>(true)
	testType.false<IsNumber<string>>(true)
	testType.false<IsNumber<''>>(true)
	testType.false<IsNumber<symbol>>(true)
	testType.false<IsNumber<bigint>>(true)
	testType.false<IsNumber<{}>>(true)
	testType.false<IsNumber<string[]>>(true)
	testType.false<IsNumber<[]>>(true)
	testType.false<IsNumber<Function>>(true)
	testType.false<IsNumber<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNumber<number | string>, boolean>(true)
	testType.equal<IsNumber<1 | string>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNumber<number | string, { distributive: false }>, false>(true)
	testType.equal<IsNumber<1 | string, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsNumber<number & { a: 1 }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsNumber<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNumber<1, { selection: 'filter' }>, 1>(true)

	testType.equal<IsNumber<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumber<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumber<string | number, { selection: 'filter' }>, number>(true)

	testType.equal<IsNumber<string | 1, { selection: 'filter' }>, 1>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNumber<number, IsNumber.$Branch>, $Then>(true)
	testType.equal<IsNumber<1, IsNumber.$Branch>, $Then>(true)

	testType.equal<IsNumber<any, IsNumber.$Branch>, $Else>(true)
	testType.equal<IsNumber<unknown, IsNumber.$Branch>, $Else>(true)
	testType.equal<IsNumber<never, IsNumber.$Branch>, $Else>(true)
	testType.equal<IsNumber<void, IsNumber.$Branch>, $Else>(true)
})

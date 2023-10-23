import { it } from '@jest/globals'

import { type $Else, type $Then,type IsNotStrictNumber, testType } from '../index.js'

it('returns false for number', () => {
	testType.equal<IsNotStrictNumber<number>, false>(true)
	testType.false<IsNotStrictNumber<number>>(true)
})

it('returns true if T is number literial', () => {
	testType.true<IsNotStrictNumber<-1>>(true)
	testType.true<IsNotStrictNumber<0>>(true)
	testType.true<IsNotStrictNumber<1>>(true)
	testType.true<IsNotStrictNumber<1.1>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotStrictNumber<void>>(true)
	testType.true<IsNotStrictNumber<unknown>>(true)
	testType.true<IsNotStrictNumber<any>>(true)
	testType.true<IsNotStrictNumber<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotStrictNumber<undefined>>(true)
	testType.true<IsNotStrictNumber<null>>(true)
	testType.true<IsNotStrictNumber<boolean>>(true)
	testType.true<IsNotStrictNumber<true>>(true)
	testType.true<IsNotStrictNumber<true>>(true)
	testType.true<IsNotStrictNumber<string>>(true)
	testType.true<IsNotStrictNumber<''>>(true)
	testType.true<IsNotStrictNumber<symbol>>(true)
	testType.true<IsNotStrictNumber<bigint>>(true)
	testType.true<IsNotStrictNumber<{}>>(true)
	testType.true<IsNotStrictNumber<string[]>>(true)
	testType.true<IsNotStrictNumber<[]>>(true)
	testType.true<IsNotStrictNumber<Function>>(true)
	testType.true<IsNotStrictNumber<() => void>>(true)
})

it('distributes over union type', () => {
	// `number | 1` is pre-resolved by TypeScript to `number`
	testType.equal<number | 1, number>(true)
	testType.equal<IsNotStrictNumber<number | 1>, false>(true)
	testType.equal<IsNotStrictNumber<number | string>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotStrictNumber<number | string, { distributive: false }>, true>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsNotStrictNumber<number & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotStrictNumber<number, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotStrictNumber<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStrictNumber<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotStrictNumber<string | boolean, { selection: 'filter' }>, string | boolean>(true)

	testType.equal<IsNotStrictNumber<string | number, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotStrictNumber<number, IsNotStrictNumber.$Branch>, $Else>(true)
	testType.equal<IsNotStrictNumber<1, IsNotStrictNumber.$Branch>, $Then>(true)

	testType.equal<IsNotStrictNumber<any, IsNotStrictNumber.$Branch>, $Then>(true)
	testType.equal<IsNotStrictNumber<unknown, IsNotStrictNumber.$Branch>, $Then>(true)
	testType.equal<IsNotStrictNumber<never, IsNotStrictNumber.$Branch>, $Then>(true)
	testType.equal<IsNotStrictNumber<void, IsNotStrictNumber.$Branch>, $Then>(true)

	testType.equal<IsNotStrictNumber<number | string, IsNotStrictNumber.$Branch>, $Then | $Else>(true)
})

import { it } from '@jest/globals'
import { testType, type $Else, type $Then, type IsStrictNumber } from '../index.js'

it('returns true for number', () => {
	testType.true<IsStrictNumber<number>>(true)
})

it('returns false if T is number literial', () => {
	testType.false<IsStrictNumber<-1>>(true)
	testType.false<IsStrictNumber<0>>(true)
	testType.false<IsStrictNumber<1>>(true)
	testType.false<IsStrictNumber<1.1>>(true)
})

it('returns false for special types', () => {
	testType.false<IsStrictNumber<void>>(true)
	testType.false<IsStrictNumber<unknown>>(true)
	testType.false<IsStrictNumber<any>>(true)
	testType.false<IsStrictNumber<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsStrictNumber<undefined>>(true)
	testType.false<IsStrictNumber<null>>(true)
	testType.false<IsStrictNumber<boolean>>(true)
	testType.false<IsStrictNumber<true>>(true)
	testType.false<IsStrictNumber<false>>(true)
	testType.false<IsStrictNumber<string>>(true)
	testType.false<IsStrictNumber<''>>(true)
	testType.false<IsStrictNumber<symbol>>(true)
	testType.false<IsStrictNumber<bigint>>(true)
	testType.false<IsStrictNumber<{}>>(true)
	testType.false<IsStrictNumber<string[]>>(true)
	testType.false<IsStrictNumber<[]>>(true)
	testType.false<IsStrictNumber<Function>>(true)
	testType.false<IsStrictNumber<() => void>>(true)
})

it('distributes over union type', () => {
	// `number | 1` is pre-resolved by TypeScript to `number`
	testType.equal<number | 1, number>(true)
	testType.equal<IsStrictNumber<number | 1>, true>(true)
	testType.equal<IsStrictNumber<number | string>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsStrictNumber<number | string, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsStrictNumber<number & { a: 1 }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsStrictNumber<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsStrictNumber<1, { selection: 'filter' }>, never>(true)

	testType.equal<IsStrictNumber<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictNumber<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictNumber<string | number, { selection: 'filter' }>, number>(true)
	testType.equal<IsStrictNumber<string | number, { selection: 'filter', distributive: false }>, never>(true)

	testType.equal<IsStrictNumber<string | true, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsStrictNumber<number, IsStrictNumber.$Branch>, $Then>(true)
	testType.equal<IsStrictNumber<1, IsStrictNumber.$Branch>, $Else>(true)

	testType.equal<IsStrictNumber<any, IsStrictNumber.$Branch>, $Else>(true)
	testType.equal<IsStrictNumber<unknown, IsStrictNumber.$Branch>, $Else>(true)
	testType.equal<IsStrictNumber<never, IsStrictNumber.$Branch>, $Else>(true)
	testType.equal<IsStrictNumber<void, IsStrictNumber.$Branch>, $Else>(true)
})

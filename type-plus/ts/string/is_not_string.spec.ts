import { it } from '@jest/globals'
import { testType, type $Else, type $Then, type IsNotString } from '../index.js'

it('returns false for string', () => {
	testType.false<IsNotString<string>>(true)
})

it('returns false if T is a string literal', () => {
	testType.false<IsNotString<''>>(true)
	testType.false<IsNotString<'a'>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotString<any>>(true)
	testType.true<IsNotString<unknown>>(true)
	testType.true<IsNotString<void>>(true)
	testType.true<IsNotString<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotString<undefined>>(true)
	testType.true<IsNotString<null>>(true)
	testType.true<IsNotString<boolean>>(true)
	testType.true<IsNotString<true>>(true)
	testType.true<IsNotString<false>>(true)
	testType.true<IsNotString<number>>(true)
	testType.true<IsNotString<1>>(true)
	testType.true<IsNotString<symbol>>(true)
	testType.true<IsNotString<bigint>>(true)
	testType.true<IsNotString<{}>>(true)
	testType.true<IsNotString<string[]>>(true)
	testType.true<IsNotString<[]>>(true)
	testType.true<IsNotString<Function>>(true)
	testType.true<IsNotString<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotString<number | string>, boolean>(true)
})

it('returns false if N is union of string and string literal', () => {
	testType.equal<IsNotString<string | 'a'>, false>(true)
})

it('returns false if T is intersection of string, as that is still considered a string', () => {
	testType.equal<IsNotString<string & { a: 1 }>, false>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotString<string | 1>, boolean>(true)
	testType.equal<IsNotString<'' | 1, { distributive: false }>, true>(true)
	testType.true<IsNotString<number | string, { distributive: false }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotString<string, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotString<'', { selection: 'filter' }>, never>(true)

	testType.equal<IsNotString<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotString<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotString<string | boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsNotString<'' | 1, { selection: 'filter' }>, 1>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotString<string, IsNotString.$Branch>, $Else>(true)
	testType.equal<IsNotString<'', IsNotString.$Branch>, $Else>(true)

	testType.equal<IsNotString<any, IsNotString.$Branch>, $Then>(true)
	testType.equal<IsNotString<unknown, IsNotString.$Branch>, $Then>(true)
	testType.equal<IsNotString<never, IsNotString.$Branch>, $Then>(true)
	testType.equal<IsNotString<void, IsNotString.$Branch>, $Then>(true)

	testType.equal<IsNotString<string | number, IsNotString.$Branch>, $Then | $Else>(true)
})

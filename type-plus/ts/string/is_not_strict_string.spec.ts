import { it } from '@jest/globals'
import { testType, type $Else, type $Then, type IsNotStrictString } from '../index.js'

it('returns false for string', () => {
	testType.false<IsNotStrictString<string>>(true)
})

it('returns true if T is a string literal', () => {
	testType.true<IsNotStrictString<''>>(true)
	testType.true<IsNotStrictString<'a'>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotStrictString<any>>(true)
	testType.true<IsNotStrictString<unknown>>(true)
	testType.true<IsNotStrictString<void>>(true)
	testType.true<IsNotStrictString<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotStrictString<undefined>>(true)
	testType.true<IsNotStrictString<null>>(true)
	testType.true<IsNotStrictString<boolean>>(true)
	testType.true<IsNotStrictString<true>>(true)
	testType.true<IsNotStrictString<false>>(true)
	testType.true<IsNotStrictString<number>>(true)
	testType.true<IsNotStrictString<1>>(true)
	testType.true<IsNotStrictString<symbol>>(true)
	testType.true<IsNotStrictString<bigint>>(true)
	testType.true<IsNotStrictString<{}>>(true)
	testType.true<IsNotStrictString<string[]>>(true)
	testType.true<IsNotStrictString<[]>>(true)
	testType.true<IsNotStrictString<Function>>(true)
	testType.true<IsNotStrictString<() => void>>(true)
})

it('distributes over union type', () => {
	// `string | 'abc'` is pre-resolved by TypeScript to `string`
	testType.equal<string | 'abc', string>(true)
	testType.equal<IsNotStrictString<string | 'abc'>, false>(true)
	testType.equal<IsNotStrictString<string | number>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotStrictString<string | number, { distributive: false }>, true>(true)
})

it('returns false for intersection type', () => {
	testType.equal<IsNotStrictString<string & { a: 1 }>, false>(true)
	testType.equal<IsNotStrictString<'' & { a: 1 }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsNotStrictString<string, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStrictString<'', { selection: 'filter' }>, ''>(true)

	testType.equal<IsNotStrictString<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStrictString<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotStrictString<string | number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotStrictString<string | number, { selection: 'filter', distributive: false }>, string | number>(true)
	testType.equal<IsNotStrictString<'' | true, { selection: 'filter' }>, '' | true>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotStrictString<string, IsNotStrictString.$Branch>, $Else>(true)
	testType.equal<IsNotStrictString<'', IsNotStrictString.$Branch>, $Then>(true)

	testType.equal<IsNotStrictString<any, IsNotStrictString.$Branch>, $Then>(true)
	testType.equal<IsNotStrictString<unknown, IsNotStrictString.$Branch>, $Then>(true)
	testType.equal<IsNotStrictString<never, IsNotStrictString.$Branch>, $Then>(true)
	testType.equal<IsNotStrictString<void, IsNotStrictString.$Branch>, $Then>(true)
})

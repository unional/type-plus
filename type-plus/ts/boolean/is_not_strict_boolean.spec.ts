import { it } from '@jest/globals'
import { testType, type IsNotStrictBoolean, type $Else, type $Then } from '../index.js'

it('returns false if T is boolean', () => {
	testType.equal<IsNotStrictBoolean<boolean>, false>(true)
})

it('returns true it T is true or false literal', () => {
	testType.equal<IsNotStrictBoolean<true>, true>(true)
	testType.equal<IsNotStrictBoolean<false>, true>(true)
	testType.true<IsNotStrictBoolean<true, { distributive: false }>>(true)
	testType.true<IsNotStrictBoolean<false, { distributive: false }>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotStrictBoolean<void>>(true)
	testType.true<IsNotStrictBoolean<unknown>>(true)
	testType.true<IsNotStrictBoolean<any>>(true)
	testType.true<IsNotStrictBoolean<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotStrictBoolean<undefined>>(true)
	testType.true<IsNotStrictBoolean<null>>(true)
	testType.true<IsNotStrictBoolean<number>>(true)
	testType.true<IsNotStrictBoolean<1>>(true)
	testType.true<IsNotStrictBoolean<string>>(true)
	testType.true<IsNotStrictBoolean<''>>(true)
	testType.true<IsNotStrictBoolean<symbol>>(true)
	testType.true<IsNotStrictBoolean<bigint>>(true)
	testType.true<IsNotStrictBoolean<1n>>(true)
	testType.true<IsNotStrictBoolean<{}>>(true)
	testType.true<IsNotStrictBoolean<{ a: 1 }>>(true)
	testType.true<IsNotStrictBoolean<string[]>>(true)
	testType.true<IsNotStrictBoolean<[]>>(true)
	testType.true<IsNotStrictBoolean<Function>>(true)
	testType.true<IsNotStrictBoolean<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotStrictBoolean<boolean | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.true<IsNotStrictBoolean<boolean | 1, { distributive: false }>>(true)
})

it('returns false for intersection type', () => {
	testType.equal<IsNotStrictBoolean<boolean & { a: 1 }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsNotStrictBoolean<boolean, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStrictBoolean<true, { selection: 'filter' }>, true>(true)

	testType.equal<IsNotStrictBoolean<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStrictBoolean<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotStrictBoolean<string | boolean, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotStrictBoolean<string | boolean, { selection: 'filter', distributive: false }>, string | boolean>(true)

	testType.equal<IsNotStrictBoolean<string | true, { selection: 'filter' }>, string | true>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotStrictBoolean<boolean, IsNotStrictBoolean.$Branch>, $Else>(true)

	testType.equal<IsNotStrictBoolean<any, IsNotStrictBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotStrictBoolean<unknown, IsNotStrictBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotStrictBoolean<never, IsNotStrictBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotStrictBoolean<void, IsNotStrictBoolean.$Branch>, $Then>(true)
})

import { it } from '@jest/globals'
import { testType, type IsStrictBoolean, type $Then, type $Else } from '../index.js'

it('returns true if T is boolean', () => {

	testType.true<IsStrictBoolean<boolean>>(true)
})

it('returns false it T is true or false literal', () => {
	testType.false<IsStrictBoolean<true>>(true)
	testType.false<IsStrictBoolean<false>>(true)
})

it('returns false for special types', () => {
	testType.false<IsStrictBoolean<void>>(true)
	testType.false<IsStrictBoolean<unknown>>(true)
	testType.equal<IsStrictBoolean<any>, false>(true)
	testType.false<IsStrictBoolean<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsStrictBoolean<undefined>>(true)
	testType.false<IsStrictBoolean<null>>(true)
	testType.false<IsStrictBoolean<number>>(true)
	testType.false<IsStrictBoolean<1>>(true)
	testType.false<IsStrictBoolean<string>>(true)
	testType.false<IsStrictBoolean<''>>(true)
	testType.false<IsStrictBoolean<symbol>>(true)
	testType.false<IsStrictBoolean<bigint>>(true)
	testType.false<IsStrictBoolean<1n>>(true)
	testType.false<IsStrictBoolean<{}>>(true)
	testType.false<IsStrictBoolean<{ a: 1 }>>(true)
	testType.false<IsStrictBoolean<string[]>>(true)
	testType.false<IsStrictBoolean<[]>>(true)
	testType.false<IsStrictBoolean<Function>>(true)
	testType.false<IsStrictBoolean<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsStrictBoolean<boolean | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsStrictBoolean<boolean | 1, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsStrictBoolean<boolean & { a: 1 }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsStrictBoolean<boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsStrictBoolean<true, { selection: 'filter' }>, never>(true)

	testType.equal<IsStrictBoolean<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictBoolean<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictBoolean<string | boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsStrictBoolean<string | boolean, { selection: 'filter', distributive: false }>, never>(true)

	testType.equal<IsStrictBoolean<string | true, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsStrictBoolean<boolean, IsStrictBoolean.$Branch>, $Then>(true)

	testType.equal<IsStrictBoolean<any, IsStrictBoolean.$Branch>, $Else>(true)
	testType.equal<IsStrictBoolean<unknown, IsStrictBoolean.$Branch>, $Else>(true)
	testType.equal<IsStrictBoolean<never, IsStrictBoolean.$Branch>, $Else>(true)
	testType.equal<IsStrictBoolean<void, IsStrictBoolean.$Branch>, $Else>(true)
})

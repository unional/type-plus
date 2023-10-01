import { it } from '@jest/globals'
import { testType, type IsBoolean, type $Then, type $Else } from '../index.js'

it('returns true if T is boolean', () => {
	testType.true<IsBoolean<boolean>>(true)
})

it('returns true it T is true or false literal', () => {
	testType.true<IsBoolean<true>>(true)
	testType.true<IsBoolean<false>>(true)
})

it('returns false for special types', () => {
	testType.false<IsBoolean<void>>(true)
	testType.false<IsBoolean<unknown>>(true)
	testType.false<IsBoolean<any>>(true)
	testType.false<IsBoolean<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsBoolean<undefined>>(true)
	testType.false<IsBoolean<null>>(true)
	testType.false<IsBoolean<number>>(true)
	testType.false<IsBoolean<1>>(true)
	testType.false<IsBoolean<string>>(true)
	testType.false<IsBoolean<''>>(true)
	testType.false<IsBoolean<symbol>>(true)
	testType.false<IsBoolean<bigint>>(true)
	testType.false<IsBoolean<1n>>(true)
	testType.false<IsBoolean<{}>>(true)
	testType.false<IsBoolean<{ a: 1 }>>(true)
	testType.false<IsBoolean<string[]>>(true)
	testType.false<IsBoolean<[]>>(true)
	testType.false<IsBoolean<Function>>(true)
	testType.false<IsBoolean<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsBoolean<boolean | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.false<IsBoolean<boolean | 1, { distributive: false }>>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsBoolean<boolean & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsBoolean<boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsBoolean<true, { selection: 'filter' }>, true>(true)

	testType.equal<IsBoolean<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsBoolean<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsBoolean<string | boolean, { selection: 'filter' }>, boolean>(true)

	testType.equal<IsBoolean<string | true, { selection: 'filter' }>, true>(true)
})

it('works with unique branches', () => {
	testType.equal<IsBoolean<boolean, IsBoolean.$Branch>, $Then>(true)

	testType.equal<IsBoolean<any, IsBoolean.$Branch>, $Else>(true)
	testType.equal<IsBoolean<unknown, IsBoolean.$Branch>, $Else>(true)
	testType.equal<IsBoolean<never, IsBoolean.$Branch>, $Else>(true)
	testType.equal<IsBoolean<void, IsBoolean.$Branch>, $Else>(true)
})

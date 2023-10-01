import { it } from '@jest/globals'
import { testType, type IsNotBoolean, type $Then, type $Else } from '../index.js'

it('returns false if T is boolean', () => {
	testType.false<IsNotBoolean<boolean>>(true)
})

it('returns false it T is true or false literal', () => {
	testType.false<IsNotBoolean<true>>(true)
	testType.false<IsNotBoolean<false>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotBoolean<void>>(true)
	testType.true<IsNotBoolean<unknown>>(true)
	testType.true<IsNotBoolean<any>>(true)
	testType.true<IsNotBoolean<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotBoolean<undefined>>(true)
	testType.true<IsNotBoolean<null>>(true)
	testType.true<IsNotBoolean<number>>(true)
	testType.true<IsNotBoolean<1>>(true)
	testType.true<IsNotBoolean<string>>(true)
	testType.true<IsNotBoolean<''>>(true)
	testType.true<IsNotBoolean<symbol>>(true)
	testType.true<IsNotBoolean<bigint>>(true)
	testType.true<IsNotBoolean<{}>>(true)
	testType.true<IsNotBoolean<string[]>>(true)
	testType.true<IsNotBoolean<[]>>(true)
	testType.true<IsNotBoolean<Function>>(true)
	testType.true<IsNotBoolean<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotBoolean<boolean | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.true<IsNotBoolean<boolean | 1, { distributive: false }>>(true)
})

it('returns true for intersection type', () => {
	testType.false<IsNotBoolean<boolean & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotBoolean<boolean, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotBoolean<true, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotBoolean<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotBoolean<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotBoolean<string | boolean, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotBoolean<string | boolean, { selection: 'filter', distributive: false }>, string | boolean>(true)

	testType.equal<IsNotBoolean<string | true, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotBoolean<boolean, IsNotBoolean.$Branch>, $Else>(true)

	testType.equal<IsNotBoolean<any, IsNotBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotBoolean<unknown, IsNotBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotBoolean<never, IsNotBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotBoolean<void, IsNotBoolean.$Branch>, $Then>(true)
})

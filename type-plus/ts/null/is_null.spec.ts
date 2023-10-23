import { it } from '@jest/globals'

import { type $Else,type $Then, type IsNull, testType } from '../index.js'

it('returns true for null', () => {
	testType.true<IsNull<null>>(true)
})

it('returns false for special types', () => {
	testType.false<IsNull<any>>(true)
	testType.false<IsNull<unknown>>(true)
	testType.false<IsNull<void>>(true)
	testType.false<IsNull<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsNull<undefined>>(true)
	testType.false<IsNull<boolean>>(true)
	testType.false<IsNull<true>>(true)
	testType.false<IsNull<false>>(true)
	testType.false<IsNull<number>>(true)
	testType.false<IsNull<1>>(true)
	testType.false<IsNull<string>>(true)
	testType.false<IsNull<''>>(true)
	testType.false<IsNull<symbol>>(true)
	testType.false<IsNull<bigint>>(true)
	testType.false<IsNull<{}>>(true)
	testType.false<IsNull<string[]>>(true)
	testType.false<IsNull<[]>>(true)
	testType.false<IsNull<Function>>(true)
	testType.false<IsNull<() => void>>(true)
})

it('works as filter', () => {
	testType.equal<IsNull<null, { selection: 'filter' }>, null>(true)

	testType.equal<IsNull<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNull<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsNull<string | boolean, { selection: 'filter' }>, never>(true)

	testType.equal<IsNull<string | null, { selection: 'filter' }>, null>(true)
})

it('distributes over union type', () => {
	testType.equal<null | 1, null | 1>(true)
	testType.equal<IsNull<null | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.false<IsNull<null | 1, { distributive: false }>>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNull<null, IsNull.$Branch>, $Then>(true)

	testType.equal<IsNull<any, IsNull.$Branch>, $Else>(true)
	testType.equal<IsNull<unknown, IsNull.$Branch>, $Else>(true)
	testType.equal<IsNull<never, IsNull.$Branch>, $Else>(true)
	testType.equal<IsNull<void, IsNull.$Branch>, $Else>(true)
})

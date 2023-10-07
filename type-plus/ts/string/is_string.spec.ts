import { it } from '@jest/globals'
import { testType, type $Else, type $Then, type IsString } from '../index.js'

it('returns true for string', () => {
	testType.true<IsString<string>>(true)
})

it('returns true if T is a string literal', () => {
	testType.true<IsString<''>>(true)
	testType.true<IsString<'a'>>(true)
})

it('returns false for special types', () => {
	testType.false<IsString<any>>(true)
	testType.false<IsString<unknown>>(true)
	testType.false<IsString<void>>(true)
	testType.false<IsString<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsString<undefined>>(true)
	testType.false<IsString<null>>(true)
	testType.false<IsString<boolean>>(true)
	testType.false<IsString<true>>(true)
	testType.false<IsString<false>>(true)
	testType.false<IsString<number>>(true)
	testType.false<IsString<1>>(true)
	testType.false<IsString<symbol>>(true)
	testType.false<IsString<bigint>>(true)
	testType.false<IsString<{}>>(true)
	testType.false<IsString<string[]>>(true)
	testType.false<IsString<[]>>(true)
	testType.false<IsString<Function>>(true)
	testType.false<IsString<() => void>>(true)
})


it('distributes over union type', () => {
	testType.equal<IsString<string | number>, boolean>(true)
	testType.equal<IsString<'' | number>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsString<string | number, { distributive: false }>, false>(true)
	testType.equal<IsString<'' | number, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsString<string & { a: 1 }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsString<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsString<'', { selection: 'filter' }>, ''>(true)

	testType.equal<IsString<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsString<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsString<string | number, { selection: 'filter' }>, string>(true)

	testType.equal<IsString<'' | 1, { selection: 'filter' }>, ''>(true)
})

it('works with unique branches', () => {
	testType.equal<IsString<string, IsString.$Branch>, $Then>(true)
	testType.equal<IsString<'a', IsString.$Branch>, $Then>(true)

	testType.equal<IsString<any, IsString.$Branch>, $Else>(true)
	testType.equal<IsString<unknown, IsString.$Branch>, $Else>(true)
	testType.equal<IsString<never, IsString.$Branch>, $Else>(true)
	testType.equal<IsString<void, IsString.$Branch>, $Else>(true)
})

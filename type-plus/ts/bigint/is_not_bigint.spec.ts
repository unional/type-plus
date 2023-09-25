import { it } from '@jest/globals'
import { testType, type $Else, type $Then, type IsNotBigint } from '../index.js'

it('returns false for bigint', () => {
	testType.false<IsNotBigint<bigint>>(true)
})

it('returns false if T is bigint literals', () => {
	testType.false<IsNotBigint<0n>>(true)
	testType.false<IsNotBigint<1n>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotBigint<any>>(true)
	testType.true<IsNotBigint<unknown>>(true)
	testType.true<IsNotBigint<void>>(true)
	testType.true<IsNotBigint<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotBigint<undefined>>(true)
	testType.true<IsNotBigint<null>>(true)
	testType.true<IsNotBigint<boolean>>(true)
	testType.true<IsNotBigint<true>>(true)
	testType.true<IsNotBigint<false>>(true)
	testType.true<IsNotBigint<number>>(true)
	testType.true<IsNotBigint<1>>(true)
	testType.true<IsNotBigint<string>>(true)
	testType.true<IsNotBigint<''>>(true)
	testType.true<IsNotBigint<symbol>>(true)
	testType.true<IsNotBigint<{}>>(true)
	testType.true<IsNotBigint<string[]>>(true)
	testType.true<IsNotBigint<[]>>(true)
	testType.true<IsNotBigint<Function>>(true)
	testType.true<IsNotBigint<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotBigint<bigint | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotBigint<1n | 1>, boolean>(true)
	testType.equal<IsNotBigint<1n | 1, { distributive: false }>, true>(true)
})

it('returns false for interaction type', () => {
	testType.false<IsNotBigint<bigint & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotBigint<1n, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotBigint<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotBigint<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotBigint<string | boolean, { selection: 'filter' }>, string | boolean>(true)

	testType.equal<IsNotBigint<string | 1n, { selection: 'filter' }>, string>(true)

	testType.equal<IsNotBigint<string | boolean, { selection: 'filter-unknown' }>, string | boolean>(true)
	testType.equal<IsNotBigint<string | 1n, { selection: 'filter-unknown' }>, unknown>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotBigint<bigint, IsNotBigint.$Branch>, $Else>(true)
	testType.equal<IsNotBigint<1n, IsNotBigint.$Branch>, $Else>(true)

	testType.equal<IsNotBigint<any, IsNotBigint.$Branch>, $Then>(true)
	testType.equal<IsNotBigint<unknown, IsNotBigint.$Branch>, $Then>(true)
	testType.equal<IsNotBigint<never, IsNotBigint.$Branch>, $Then>(true)
	testType.equal<IsNotBigint<void, IsNotBigint.$Branch>, $Then>(true)

	testType.equal<IsNotBigint<1n | 1, IsNotBigint.$Branch>, $Then | $Else>(true)
})

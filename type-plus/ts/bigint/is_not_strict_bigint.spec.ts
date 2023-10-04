import { it } from '@jest/globals'
import { testType, type $Else, type $Then, type IsNotStrictBigint } from '../index.js'

it('returns false for bigint', () => {
	testType.false<IsNotStrictBigint<bigint>>(true)
})

it('returns true if T is bigint literals', () => {
	testType.true<IsNotStrictBigint<0n>>(true)
	testType.true<IsNotStrictBigint<1n>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotStrictBigint<any>>(true)
	testType.true<IsNotStrictBigint<unknown>>(true)
	testType.true<IsNotStrictBigint<void>>(true)
	testType.true<IsNotStrictBigint<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotStrictBigint<undefined>>(true)
	testType.true<IsNotStrictBigint<null>>(true)
	testType.true<IsNotStrictBigint<boolean>>(true)
	testType.true<IsNotStrictBigint<true>>(true)
	testType.true<IsNotStrictBigint<false>>(true)
	testType.true<IsNotStrictBigint<number>>(true)
	testType.true<IsNotStrictBigint<1>>(true)
	testType.true<IsNotStrictBigint<string>>(true)
	testType.true<IsNotStrictBigint<''>>(true)
	testType.true<IsNotStrictBigint<symbol>>(true)
	testType.true<IsNotStrictBigint<{}>>(true)
	testType.true<IsNotStrictBigint<string[]>>(true)
	testType.true<IsNotStrictBigint<[]>>(true)
	testType.true<IsNotStrictBigint<Function>>(true)
	testType.true<IsNotStrictBigint<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotStrictBigint<bigint | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotStrictBigint<bigint | 1, { distributive: false }>, true>(true)
})

it('consider intersection type as strict', () => {
	testType.false<IsNotStrictBigint<bigint & { a: 1 }>>(true)
	testType.true<IsNotStrictBigint<1n & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotStrictBigint<bigint, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotStrictBigint<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStrictBigint<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotStrictBigint<string | boolean, { selection: 'filter' }>, string | boolean>(true)

	testType.equal<IsNotStrictBigint<string | bigint, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotStrictBigint<bigint, IsNotStrictBigint.$Branch>, $Else>(true)
	testType.equal<IsNotStrictBigint<1n, IsNotStrictBigint.$Branch>, $Then>(true)

	testType.equal<IsNotStrictBigint<any, IsNotStrictBigint.$Branch>, $Then>(true)
	testType.equal<IsNotStrictBigint<unknown, IsNotStrictBigint.$Branch>, $Then>(true)
	testType.equal<IsNotStrictBigint<never, IsNotStrictBigint.$Branch>, $Then>(true)
	testType.equal<IsNotStrictBigint<void, IsNotStrictBigint.$Branch>, $Then>(true)

	testType.equal<IsNotStrictBigint<bigint | 1, IsNotStrictBigint.$Branch>, $Then | $Else>(true)
})

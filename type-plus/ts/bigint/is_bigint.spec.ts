import { it } from '@jest/globals'
import { testType, type IsBigint, type $Then, type $Else } from '../index.js'

it('returns true for bigint', () => {
	testType.true<IsBigint<bigint>>(true)
})

it('returns true if T is bigint literals', () => {
	testType.true<IsBigint<0n>>(true)
	testType.true<IsBigint<1n>>(true)
})

it('returns false for special types', () => {
	testType.false<IsBigint<any>>(true)
	testType.false<IsBigint<unknown>>(true)
	testType.false<IsBigint<void>>(true)
	testType.false<IsBigint<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsBigint<undefined>>(true)
	testType.false<IsBigint<null>>(true)
	testType.false<IsBigint<boolean>>(true)
	testType.false<IsBigint<true>>(true)
	testType.false<IsBigint<false>>(true)
	testType.false<IsBigint<number>>(true)
	testType.false<IsBigint<1>>(true)
	testType.false<IsBigint<string>>(true)
	testType.false<IsBigint<''>>(true)
	testType.false<IsBigint<symbol>>(true)
	testType.false<IsBigint<{}>>(true)
	testType.false<IsBigint<string[]>>(true)
	testType.false<IsBigint<[]>>(true)
	testType.false<IsBigint<Function>>(true)
	testType.false<IsBigint<() => void>>(true)
})

it('distributes for union type', () => {
	testType.equal<IsBigint<bigint | 1>, boolean>(true)
	testType.equal<IsBigint<1n | 1>, boolean>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsBigint<bigint & { a: 1 }>>(true)
	testType.true<IsBigint<1n & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsBigint<1n, { selection: 'filter' }>, 1n>(true)

	testType.equal<IsBigint<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsBigint<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsBigint<string | boolean, { selection: 'filter' }>, never>(true)

	testType.equal<IsBigint<string | 1n, { selection: 'filter' }>, 1n>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsBigint<1n | 1>, boolean>(true)
	testType.equal<IsBigint<1n | 1, { distributive: false }>, false>(true)
})

it('works with unique branches', () => {
	testType.equal<IsBigint<bigint, IsBigint.$Branch>, $Then>(true)
	testType.equal<IsBigint<1n, IsBigint.$Branch>, $Then>(true)

	testType.equal<IsBigint<any, IsBigint.$Branch>, $Else>(true)
	testType.equal<IsBigint<unknown, IsBigint.$Branch>, $Else>(true)
	testType.equal<IsBigint<never, IsBigint.$Branch>, $Else>(true)
	testType.equal<IsBigint<void, IsBigint.$Branch>, $Else>(true)

	testType.equal<IsBigint<1n | 1, IsBigint.$Branch>, $Then | $Else>(true)
})

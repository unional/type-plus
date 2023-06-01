import { it } from '@jest/globals'
import { testType, type IsNotStrictBigint } from '../index.js'

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

it('returns true for union type', () => {
	testType.true<IsNotStrictBigint<bigint | 1>>(true)
})

it('returns true for interaction type', () => {
	testType.true<IsNotStrictBigint<bigint & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotStrictBigint<bigint, 1, 2>, 2>(true)
	testType.equal<IsNotStrictBigint<0n, 1, 2>, 1>(true)

	testType.equal<IsNotStrictBigint<any, 1, 2>, 1>(true)
	testType.equal<IsNotStrictBigint<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotStrictBigint<never, 1, 2>, 1>(true)
	testType.equal<IsNotStrictBigint<void, 1, 2>, 1>(true)
})

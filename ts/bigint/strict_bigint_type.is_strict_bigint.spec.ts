import { testType, type IsStrictBigint } from '../index.js'

it('returns true for bigint', () => {
	testType.true<IsStrictBigint<bigint>>(true)
})

it('returns false if T is bigint literals', () => {
	testType.false<IsStrictBigint<0n>>(true)
	testType.false<IsStrictBigint<1n>>(true)
})

it('returns false for special types', () => {
	testType.false<IsStrictBigint<any>>(true)
	testType.false<IsStrictBigint<unknown>>(true)
	testType.false<IsStrictBigint<void>>(true)
	testType.false<IsStrictBigint<never>>(true)
})

test('returns false for other types', () => {
	testType.false<IsStrictBigint<undefined>>(true)
	testType.false<IsStrictBigint<null>>(true)
	testType.false<IsStrictBigint<boolean>>(true)
	testType.false<IsStrictBigint<true>>(true)
	testType.false<IsStrictBigint<false>>(true)
	testType.false<IsStrictBigint<number>>(true)
	testType.false<IsStrictBigint<1>>(true)
	testType.false<IsStrictBigint<string>>(true)
	testType.false<IsStrictBigint<''>>(true)
	testType.false<IsStrictBigint<symbol>>(true)
	testType.false<IsStrictBigint<{}>>(true)
	testType.false<IsStrictBigint<string[]>>(true)
	testType.false<IsStrictBigint<[]>>(true)
	testType.false<IsStrictBigint<Function>>(true)
	testType.false<IsStrictBigint<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsStrictBigint<bigint | 1>>(true)
})

it('returns false for interaction type', () => {
	testType.false<IsStrictBigint<bigint & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsStrictBigint<bigint, 1, 2>, 1>(true)
	testType.equal<IsStrictBigint<0n, 1, 2>, 2>(true)

	testType.equal<IsStrictBigint<any, 1, 2>, 2>(true)
	testType.equal<IsStrictBigint<unknown, 1, 2>, 2>(true)
	testType.equal<IsStrictBigint<never, 1, 2>, 2>(true)
	testType.equal<IsStrictBigint<void, 1, 2>, 2>(true)
})

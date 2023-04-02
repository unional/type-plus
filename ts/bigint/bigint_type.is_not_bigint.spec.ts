import { testType, type IsNotBigint } from '../index.js'

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

test('returns true for other types', () => {
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

it('returns true for union type', () => {
	testType.true<IsNotBigint<bigint | 1>>(true)
})

it('returns false for interaction type', () => {
	testType.false<IsNotBigint<bigint & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotBigint<bigint, 1, 2>, 2>(true)
	testType.equal<IsNotBigint<0n, 1, 2>, 2>(true)

	testType.equal<IsNotBigint<any, 1, 2>, 1>(true)
	testType.equal<IsNotBigint<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotBigint<never, 1, 2>, 1>(true)
	testType.equal<IsNotBigint<void, 1, 2>, 1>(true)
})

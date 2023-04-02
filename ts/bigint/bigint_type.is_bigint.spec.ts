import { testType, type IsBigint } from '../index.js'

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

test('returns false for other types', () => {
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

it('returns false for union type', () => {
	testType.false<IsBigint<bigint | 1>>(true)
})

it('returns true for interaction type', () => {
	testType.true<IsBigint<bigint & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsBigint<bigint, 1, 2>, 1>(true)
	testType.equal<IsBigint<0n, 1, 2>, 1>(true)

	testType.equal<IsBigint<any, 1, 2>, 2>(true)
	testType.equal<IsBigint<unknown, 1, 2>, 2>(true)
	testType.equal<IsBigint<never, 1, 2>, 2>(true)
	testType.equal<IsBigint<void, 1, 2>, 2>(true)
})

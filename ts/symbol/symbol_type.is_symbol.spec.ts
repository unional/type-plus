import { testType, type IsSymbol } from '../index.js'

it('returns true for symbol', () => {
	testType.true<IsSymbol<symbol>>(true)

	const s = Symbol()
	testType.true<IsSymbol<typeof s>>(true)
})

it('returns false for special types', () => {
	testType.false<IsSymbol<any>>(true)
	testType.false<IsSymbol<unknown>>(true)
	testType.false<IsSymbol<void>>(true)
	testType.false<IsSymbol<never>>(true)
})

test('returns false for other types', () => {
	testType.false<IsSymbol<undefined>>(true)
	testType.false<IsSymbol<null>>(true)
	testType.false<IsSymbol<number>>(true)
	testType.false<IsSymbol<1>>(true)
	testType.false<IsSymbol<boolean>>(true)
	testType.false<IsSymbol<true>>(true)
	testType.false<IsSymbol<false>>(true)
	testType.false<IsSymbol<string>>(true)
	testType.false<IsSymbol<''>>(true)
	testType.false<IsSymbol<bigint>>(true)
	testType.false<IsSymbol<1n>>(true)
	testType.false<IsSymbol<{}>>(true)
	testType.false<IsSymbol<string[]>>(true)
	testType.false<IsSymbol<[]>>(true)
	testType.false<IsSymbol<Function>>(true)
	testType.false<IsSymbol<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsSymbol<symbol | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsSymbol<symbol & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsSymbol<symbol, 1, 2>, 1>(true)
	testType.equal<IsSymbol<0, 1, 2>, 2>(true)

	testType.equal<IsSymbol<any, 1, 2>, 2>(true)
	testType.equal<IsSymbol<unknown, 1, 2>, 2>(true)
	testType.equal<IsSymbol<never, 1, 2>, 2>(true)
	testType.equal<IsSymbol<void, 1, 2>, 2>(true)
})

import { testType, type IsNotSymbol } from '../index.js'

it('returns false for symbol', () => {
	testType.false<IsNotSymbol<symbol>>(true)

	const s = Symbol()
	testType.false<IsNotSymbol<typeof s>>(true)
})

it('returns true for other special types', () => {
	testType.true<IsNotSymbol<any>>(true)
	testType.true<IsNotSymbol<unknown>>(true)
	testType.true<IsNotSymbol<void>>(true)
	testType.true<IsNotSymbol<never>>(true)
})

test('returns true for singular types', () => {
	testType.true<IsNotSymbol<undefined>>(true)
	testType.true<IsNotSymbol<null>>(true)
	testType.true<IsNotSymbol<number>>(true)
	testType.true<IsNotSymbol<boolean>>(true)
	testType.true<IsNotSymbol<true>>(true)
	testType.true<IsNotSymbol<false>>(true)
	testType.true<IsNotSymbol<string>>(true)
	testType.true<IsNotSymbol<''>>(true)
	testType.true<IsNotSymbol<bigint>>(true)
	testType.true<IsNotSymbol<{}>>(true)
	testType.true<IsNotSymbol<string[]>>(true)
	testType.true<IsNotSymbol<[]>>(true)
	testType.true<IsNotSymbol<Function>>(true)
	testType.true<IsNotSymbol<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotSymbol<symbol | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.false<IsNotSymbol<symbol & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotSymbol<symbol, 1, 2>, 2>(true)
	testType.equal<IsNotSymbol<0, 1, 2>, 1>(true)

	testType.equal<IsNotSymbol<any, 1, 2>, 1>(true)
	testType.equal<IsNotSymbol<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotSymbol<never, 1, 2>, 1>(true)
	testType.equal<IsNotSymbol<void, 1, 2>, 1>(true)
})

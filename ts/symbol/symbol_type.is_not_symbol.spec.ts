import { type, type IsNotSymbol } from '../index.js'

it('returns false for symbol', () => {
	type.false<IsNotSymbol<symbol>>(true)

	const s = Symbol()
	type.false<IsNotSymbol<typeof s>>(true)
})

it('returns true for other special types', () => {
	type.true<IsNotSymbol<any>>(true)
	type.true<IsNotSymbol<unknown>>(true)
	type.true<IsNotSymbol<void>>(true)
	type.true<IsNotSymbol<never>>(true)
})

test('returns true for singular types', () => {
	type.true<IsNotSymbol<undefined>>(true)
	type.true<IsNotSymbol<null>>(true)
	type.true<IsNotSymbol<number>>(true)
	type.true<IsNotSymbol<boolean>>(true)
	type.true<IsNotSymbol<true>>(true)
	type.true<IsNotSymbol<false>>(true)
	type.true<IsNotSymbol<string>>(true)
	type.true<IsNotSymbol<''>>(true)
	type.true<IsNotSymbol<bigint>>(true)
	type.true<IsNotSymbol<{}>>(true)
	type.true<IsNotSymbol<string[]>>(true)
	type.true<IsNotSymbol<[]>>(true)
	type.true<IsNotSymbol<Function>>(true)
	type.true<IsNotSymbol<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotSymbol<symbol | 1>>(true)
})

it('returns true for intersection type', () => {
	type.false<IsNotSymbol<symbol & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotSymbol<symbol, 1, 2>, 2>(true)
	type.equal<IsNotSymbol<0, 1, 2>, 1>(true)

	type.equal<IsNotSymbol<any, 1, 2>, 1>(true)
	type.equal<IsNotSymbol<unknown, 1, 2>, 1>(true)
	type.equal<IsNotSymbol<never, 1, 2>, 1>(true)
	type.equal<IsNotSymbol<void, 1, 2>, 1>(true)
})

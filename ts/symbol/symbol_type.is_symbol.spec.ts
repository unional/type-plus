import { type, type IsSymbol } from '../index.js'

it('returns true for symbol', () => {
	type.true<IsSymbol<symbol>>(true)

	const s = Symbol()
	type.true<IsSymbol<typeof s>>(true)
})

it('returns false for special types', () => {
	type.false<IsSymbol<any>>(true)
	type.false<IsSymbol<unknown>>(true)
	type.false<IsSymbol<void>>(true)
	type.false<IsSymbol<never>>(true)
})

test('returns false for other types', () => {
	type.false<IsSymbol<undefined>>(true)
	type.false<IsSymbol<null>>(true)
	type.false<IsSymbol<number>>(true)
	type.false<IsSymbol<1>>(true)
	type.false<IsSymbol<boolean>>(true)
	type.false<IsSymbol<true>>(true)
	type.false<IsSymbol<false>>(true)
	type.false<IsSymbol<string>>(true)
	type.false<IsSymbol<''>>(true)
	type.false<IsSymbol<bigint>>(true)
	type.false<IsSymbol<1n>>(true)
	type.false<IsSymbol<{}>>(true)
	type.false<IsSymbol<string[]>>(true)
	type.false<IsSymbol<[]>>(true)
	type.false<IsSymbol<Function>>(true)
	type.false<IsSymbol<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsSymbol<symbol | 1>>(true)
})

it('returns true for intersection type', () => {
	type.true<IsSymbol<symbol & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsSymbol<symbol, 1, 2>, 1>(true)
	type.equal<IsSymbol<0, 1, 2>, 2>(true)

	type.equal<IsSymbol<any, 1, 2>, 2>(true)
	type.equal<IsSymbol<unknown, 1, 2>, 2>(true)
	type.equal<IsSymbol<never, 1, 2>, 2>(true)
	type.equal<IsSymbol<void, 1, 2>, 2>(true)
})

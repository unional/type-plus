import { type, type SymbolType } from '../index.js'

it('returns T if T is symbol', () => {
	type.equal<SymbolType<symbol>, symbol>(true)

	const s = Symbol()
	type.equal<SymbolType<typeof s>, symbol>(true)
})

it('returns never for special types', () => {
	type.never<SymbolType<any>>(true)
	type.never<SymbolType<unknown>>(true)
	type.never<SymbolType<void>>(true)
	type.never<SymbolType<never>>(true)
})

test('returns never for other types', () => {
	type.never<SymbolType<undefined>>(true)
	type.never<SymbolType<null>>(true)
	type.never<SymbolType<number>>(true)
	type.never<SymbolType<1>>(true)
	type.never<SymbolType<boolean>>(true)
	type.never<SymbolType<true>>(true)
	type.never<SymbolType<false>>(true)
	type.never<SymbolType<string>>(true)
	type.never<SymbolType<''>>(true)
	type.never<SymbolType<bigint>>(true)
	type.never<SymbolType<1n>>(true)
	type.never<SymbolType<{}>>(true)
	type.never<SymbolType<string[]>>(true)
	type.never<SymbolType<[]>>(true)
	type.never<SymbolType<Function>>(true)
	type.never<SymbolType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<SymbolType<symbol | 1>>(true)
})

it('returns T for intersection type with symbol', () => {
	type.equal<SymbolType<symbol & { a: 1 }>, symbol & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	type.equal<SymbolType<symbol, 1, 2>, 1>(true)
	type.equal<SymbolType<0, 1, 2>, 2>(true)

	type.equal<SymbolType<any, 1, 2>, 2>(true)
	type.equal<SymbolType<unknown, 1, 2>, 2>(true)
	type.equal<SymbolType<never, 1, 2>, 2>(true)
	type.equal<SymbolType<void, 1, 2>, 2>(true)
})

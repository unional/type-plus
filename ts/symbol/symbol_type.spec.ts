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

test('union behavior of symbol', () => {
	type.equal<symbol | undefined, symbol | undefined>(true)
	type.equal<symbol | null, symbol | null>(true)
	type.equal<symbol | boolean, symbol | boolean>(true)
	type.equal<symbol | true, symbol | true>(true)
	type.equal<symbol | false, symbol | false>(true)
	type.equal<symbol | number, symbol | number>(true)
	type.equal<symbol | 1, symbol | 1>(true)
	type.equal<symbol | string, symbol | string>(true)
	type.equal<symbol | '', symbol | ''>(true)
	type.equal<symbol | symbol, symbol>(true)
	type.equal<symbol | bigint, symbol | bigint>(true)
	type.equal<symbol | 1n, symbol | 1n>(true)
	type.equal<symbol | {}, symbol | {}>(true)
	type.equal<symbol | { a: 1 }, symbol | { a: 1 }>(true)
	type.equal<symbol | string[], symbol | string[]>(true)
	type.equal<symbol | [], symbol | []>(true)
	type.equal<symbol | Function, symbol | Function>(true)
	type.equal<symbol | (() => void), symbol | (() => void)>(true)

	type.equal<symbol | any, any>(true)
	type.equal<symbol | unknown, unknown>(true)
	type.equal<symbol | never, symbol>(true)
	type.equal<symbol | void, symbol | void>(true)
})

test('intersection behavior of symbol', () => {
	type.equal<symbol & undefined, never>(true)
	type.equal<symbol & null, never>(true)

	type.equal<symbol & boolean, never>(true)
	type.equal<symbol & true, never>(true)
	type.equal<symbol & false, never>(true)
	type.equal<symbol & number, never>(true)
	type.equal<symbol & 1, never>(true)
	type.equal<symbol & string, never>(true)
	type.equal<symbol & '', never>(true)

	type.equal<symbol & symbol, symbol>(true)

	type.equal<symbol & bigint, never>(true)
	type.equal<symbol & 1n, never>(true)

	type.equal<symbol & {}, symbol>(true)

	type.equal<symbol & { a: 1 }, symbol & { a: 1 }>(true)
	type.equal<symbol & string[], symbol & string[]>(true)
	type.equal<symbol & [], symbol & []>(true)
	type.equal<symbol & Function, symbol & Function>(true)
	type.equal<symbol & (() => void), symbol & (() => void)>(true)

	type.equal<symbol & any, any>(true)
	type.equal<symbol & unknown, symbol>(true)
	type.equal<symbol & never, never>(true)
	type.equal<symbol & void, never>(true)
})

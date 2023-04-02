import { testType, type SymbolType } from '../index.js'

it('returns T if T is symbol', () => {
	testType.equal<SymbolType<symbol>, symbol>(true)

	const s = Symbol()
	testType.equal<SymbolType<typeof s>, symbol>(true)
})

it('returns never for special types', () => {
	testType.never<SymbolType<any>>(true)
	testType.never<SymbolType<unknown>>(true)
	testType.never<SymbolType<void>>(true)
	testType.never<SymbolType<never>>(true)
})

test('returns never for other types', () => {
	testType.never<SymbolType<undefined>>(true)
	testType.never<SymbolType<null>>(true)
	testType.never<SymbolType<number>>(true)
	testType.never<SymbolType<1>>(true)
	testType.never<SymbolType<boolean>>(true)
	testType.never<SymbolType<true>>(true)
	testType.never<SymbolType<false>>(true)
	testType.never<SymbolType<string>>(true)
	testType.never<SymbolType<''>>(true)
	testType.never<SymbolType<bigint>>(true)
	testType.never<SymbolType<1n>>(true)
	testType.never<SymbolType<{}>>(true)
	testType.never<SymbolType<string[]>>(true)
	testType.never<SymbolType<[]>>(true)
	testType.never<SymbolType<Function>>(true)
	testType.never<SymbolType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<SymbolType<symbol | 1>>(true)
})

it('returns T for intersection type with symbol', () => {
	testType.equal<SymbolType<symbol & { a: 1 }>, symbol & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<SymbolType<symbol, 1, 2>, 1>(true)
	testType.equal<SymbolType<0, 1, 2>, 2>(true)

	testType.equal<SymbolType<any, 1, 2>, 2>(true)
	testType.equal<SymbolType<unknown, 1, 2>, 2>(true)
	testType.equal<SymbolType<never, 1, 2>, 2>(true)
	testType.equal<SymbolType<void, 1, 2>, 2>(true)
})

test('union behavior of symbol', () => {
	testType.equal<symbol | undefined, symbol | undefined>(true)
	testType.equal<symbol | null, symbol | null>(true)
	testType.equal<symbol | boolean, symbol | boolean>(true)
	testType.equal<symbol | true, symbol | true>(true)
	testType.equal<symbol | false, symbol | false>(true)
	testType.equal<symbol | number, symbol | number>(true)
	testType.equal<symbol | 1, symbol | 1>(true)
	testType.equal<symbol | string, symbol | string>(true)
	testType.equal<symbol | '', symbol | ''>(true)
	testType.equal<symbol | symbol, symbol>(true)
	testType.equal<symbol | bigint, symbol | bigint>(true)
	testType.equal<symbol | 1n, symbol | 1n>(true)
	testType.equal<symbol | {}, symbol | {}>(true)
	testType.equal<symbol | { a: 1 }, symbol | { a: 1 }>(true)
	testType.equal<symbol | string[], symbol | string[]>(true)
	testType.equal<symbol | [], symbol | []>(true)
	testType.equal<symbol | Function, symbol | Function>(true)
	testType.equal<symbol | (() => void), symbol | (() => void)>(true)

	testType.equal<symbol | any, any>(true)
	testType.equal<symbol | unknown, unknown>(true)
	testType.equal<symbol | never, symbol>(true)
	testType.equal<symbol | void, symbol | void>(true)
})

test('intersection behavior of symbol', () => {
	testType.equal<symbol & undefined, never>(true)
	testType.equal<symbol & null, never>(true)

	testType.equal<symbol & boolean, never>(true)
	testType.equal<symbol & true, never>(true)
	testType.equal<symbol & false, never>(true)
	testType.equal<symbol & number, never>(true)
	testType.equal<symbol & 1, never>(true)
	testType.equal<symbol & string, never>(true)
	testType.equal<symbol & '', never>(true)

	testType.equal<symbol & symbol, symbol>(true)

	testType.equal<symbol & bigint, never>(true)
	testType.equal<symbol & 1n, never>(true)

	testType.equal<symbol & {}, symbol>(true)

	testType.equal<symbol & { a: 1 }, symbol & { a: 1 }>(true)
	testType.equal<symbol & string[], symbol & string[]>(true)
	testType.equal<symbol & [], symbol & []>(true)
	testType.equal<symbol & Function, symbol & Function>(true)
	testType.equal<symbol & (() => void), symbol & (() => void)>(true)

	testType.equal<symbol & any, any>(true)
	testType.equal<symbol & unknown, symbol>(true)
	testType.equal<symbol & never, never>(true)
	testType.equal<symbol & void, never>(true)
})

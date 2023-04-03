

import { it } from '@jest/globals'
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

it('returns never for other types', () => {
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

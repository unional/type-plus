import { type, type AnyFunction, type FunctionType } from '../index.js'

it('returns T if T is Function', () => {
	type.equal<FunctionType<Function>, Function>(true)
})

it('returns T if T is function signature', () => {
	type.equal<FunctionType<() => void>, () => void>(true)
	type.equal<FunctionType<AnyFunction>, AnyFunction>(true)
})

it('returns never for special types', () => {
	type.never<FunctionType<void>>(true)
	type.never<FunctionType<unknown>>(true)
	type.never<FunctionType<any>>(true)
	type.never<FunctionType<never>>(true)
})

it('returns never for all other types', () => {
	type.never<FunctionType<undefined>>(true)
	type.never<FunctionType<null>>(true)
	type.never<FunctionType<boolean>>(true)
	type.never<FunctionType<true>>(true)
	type.never<FunctionType<false>>(true)
	type.never<FunctionType<number>>(true)
	type.never<FunctionType<1>>(true)
	type.never<FunctionType<string>>(true)
	type.never<FunctionType<''>>(true)
	type.never<FunctionType<symbol>>(true)
	type.never<FunctionType<bigint>>(true)
	type.never<FunctionType<{}>>(true)
	type.never<FunctionType<string[]>>(true)
	type.never<FunctionType<[]>>(true)
})

it('returns T if T is union of function', () => {
	type.equal<FunctionType<(() => void) | { a: 1 }>, (() => void) | { a: 1 }>(true)
})

it('returns T if T is function overloads', () => {
	type.equal<FunctionType<{ (): void; (x: number): number }>, { (): void; (x: number): number }>(true)
})

it('returns T if T is intersection of function', () => {
	type.equal<FunctionType<(() => void) & { a: 1 }>, (() => void) & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	type.equal<FunctionType<Function, 1, 2>, 1>(true)

	type.equal<FunctionType<any, 1, 2>, 2>(true)
	type.equal<FunctionType<unknown, 1, 2>, 2>(true)
	type.equal<FunctionType<never, 1, 2>, 2>(true)
	type.equal<FunctionType<void, 1, 2>, 2>(true)
})

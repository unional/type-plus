import { type, type AnyFunction, type StrictFunctionType } from '../index.js'

it('returns T if T is Function', () => {
	type.equal<StrictFunctionType<Function>, Function>(true)
})

it('returns never if T is a function signature', () => {
	type.never<StrictFunctionType<() => void>>(true)
	type.never<StrictFunctionType<AnyFunction>>(true)
})

it('returns never if T is function overloads', () => {
	type.never<StrictFunctionType<{ (): void; (x: number): number }>>(true)
	type.never<StrictFunctionType<{ (): void; a: 1 }>>(true)
})

it('returns never for special types', () => {
	type.never<StrictFunctionType<void>>(true)
	type.never<StrictFunctionType<unknown>>(true)
	type.never<StrictFunctionType<any>>(true)
	type.never<StrictFunctionType<never>>(true)
})

it('returns never for other types', () => {
	type.never<StrictFunctionType<undefined>>(true)
	type.never<StrictFunctionType<null>>(true)
	type.never<StrictFunctionType<boolean>>(true)
	type.never<StrictFunctionType<true>>(true)
	type.never<StrictFunctionType<false>>(true)
	type.never<StrictFunctionType<number>>(true)
	type.never<StrictFunctionType<1>>(true)
	type.never<StrictFunctionType<string>>(true)
	type.never<StrictFunctionType<''>>(true)
	type.never<StrictFunctionType<symbol>>(true)
	type.never<StrictFunctionType<bigint>>(true)
	type.never<StrictFunctionType<1n>>(true)
	type.never<StrictFunctionType<{}>>(true)
	type.never<StrictFunctionType<{ a: 1 }>>(true)
	type.never<StrictFunctionType<string[]>>(true)
	type.never<StrictFunctionType<[]>>(true)
})

it('returns never if T is union of function and other types', () => {
	type.never<StrictFunctionType<Function | { a: 1 }>>(true)
})

it('returns never if T is intersection of function', () => {
	type.never<StrictFunctionType<Function & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<StrictFunctionType<Function, 1, 2>, 1>(true)
	type.equal<StrictFunctionType<AnyFunction, 1, 2>, 2>(true)

	type.equal<StrictFunctionType<any, 1, 2>, 2>(true)
	type.equal<StrictFunctionType<unknown, 1, 2>, 2>(true)
	type.equal<StrictFunctionType<never, 1, 2>, 2>(true)
	type.equal<StrictFunctionType<void, 1, 2>, 2>(true)
})

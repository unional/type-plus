import { it } from '@jest/globals'
import { testType, type AnyFunction, type StrictFunctionType } from '../index.js'

it('returns T if T is Function', () => {
	testType.equal<StrictFunctionType<Function>, Function>(true)
})

it('returns never if T is a function signature', () => {
	testType.never<StrictFunctionType<() => void>>(true)
	testType.never<StrictFunctionType<AnyFunction>>(true)
})

it('returns never if T is function overloads', () => {
	testType.never<StrictFunctionType<{ (): void, (x: number): number }>>(true)
	testType.never<StrictFunctionType<{ (): void, a: 1 }>>(true)
})

it('returns never for special types', () => {
	testType.never<StrictFunctionType<void>>(true)
	testType.never<StrictFunctionType<unknown>>(true)
	testType.never<StrictFunctionType<any>>(true)
	testType.never<StrictFunctionType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<StrictFunctionType<undefined>>(true)
	testType.never<StrictFunctionType<null>>(true)
	testType.never<StrictFunctionType<boolean>>(true)
	testType.never<StrictFunctionType<true>>(true)
	testType.never<StrictFunctionType<false>>(true)
	testType.never<StrictFunctionType<number>>(true)
	testType.never<StrictFunctionType<1>>(true)
	testType.never<StrictFunctionType<string>>(true)
	testType.never<StrictFunctionType<''>>(true)
	testType.never<StrictFunctionType<symbol>>(true)
	testType.never<StrictFunctionType<bigint>>(true)
	testType.never<StrictFunctionType<1n>>(true)
	testType.never<StrictFunctionType<{}>>(true)
	testType.never<StrictFunctionType<{ a: 1 }>>(true)
	testType.never<StrictFunctionType<string[]>>(true)
	testType.never<StrictFunctionType<[]>>(true)
})

it('returns never if T is union of function and other types', () => {
	testType.never<StrictFunctionType<Function | { a: 1 }>>(true)
})

it('returns never if T is intersection of function', () => {
	testType.never<StrictFunctionType<Function & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<StrictFunctionType<Function, 1, 2>, 1>(true)
	testType.equal<StrictFunctionType<AnyFunction, 1, 2>, 2>(true)

	testType.equal<StrictFunctionType<any, 1, 2>, 2>(true)
	testType.equal<StrictFunctionType<unknown, 1, 2>, 2>(true)
	testType.equal<StrictFunctionType<never, 1, 2>, 2>(true)
	testType.equal<StrictFunctionType<void, 1, 2>, 2>(true)
})

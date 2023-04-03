import { it } from '@jest/globals'
import { testType, type AnyFunction, type NotFunctionType } from '../index.js'

it('returns never if T is Function', () => {
	testType.never<NotFunctionType<Function>>(true)
})

it('returns never if T is function signature', () => {
	testType.never<NotFunctionType<() => void>>(true)
	testType.never<NotFunctionType<AnyFunction>>(true)
})

it('returns T for special types', () => {
	testType.equal<NotFunctionType<void>, void>(true)
	testType.equal<NotFunctionType<unknown>, unknown>(true)
	testType.equal<NotFunctionType<any>, any>(true)
	testType.equal<NotFunctionType<never>, never>(true)
})

it('returns T for all other types', () => {
	testType.equal<NotFunctionType<undefined>, undefined>(true)
	testType.equal<NotFunctionType<null>, null>(true)
	testType.equal<NotFunctionType<boolean>, boolean>(true)
	testType.equal<NotFunctionType<true>, true>(true)
	testType.equal<NotFunctionType<false>, false>(true)
	testType.equal<NotFunctionType<number>, number>(true)
	testType.equal<NotFunctionType<1>, 1>(true)
	testType.equal<NotFunctionType<string>, string>(true)
	testType.equal<NotFunctionType<''>, ''>(true)
	testType.equal<NotFunctionType<symbol>, symbol>(true)
	testType.equal<NotFunctionType<bigint>, bigint>(true)
	testType.equal<NotFunctionType<{}>, {}>(true)
	testType.equal<NotFunctionType<string[]>, string[]>(true)
	testType.equal<NotFunctionType<[]>, []>(true)
})

it('returns T if T is union of function and other types', () => {
	testType.equal<NotFunctionType<Function | { a: 1 }>, Function | { a: 1 }>(true)
})

it('returns never if T is function overloads', () => {
	testType.never<NotFunctionType<{ (): void; (x: number): number }>>(true)
})

it('returns never if T is intersection of function', () => {
	testType.never<NotFunctionType<Function & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotFunctionType<Function, 1, 2>, 2>(true)
	testType.equal<NotFunctionType<{}, 1, 2>, 1>(true)

	testType.equal<NotFunctionType<any, 1, 2>, 1>(true)
	testType.equal<NotFunctionType<unknown, 1, 2>, 1>(true)
	testType.equal<NotFunctionType<never, 1, 2>, 1>(true)
	testType.equal<NotFunctionType<void, 1, 2>, 1>(true)
})

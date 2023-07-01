import { it } from '@jest/globals'
import { testType, type AnyFunction, type NotStrictFunctionType } from '../index.js'

it('returns never if T is Function', () => {
	testType.never<NotStrictFunctionType<Function>>(true)
})

it('returns T if T is function signature', () => {
	testType.equal<NotStrictFunctionType<() => void>, () => void>(true)
	testType.equal<NotStrictFunctionType<AnyFunction>, AnyFunction>(true)
})

it('returns T if T is function overloads', () => {
	testType.equal<NotStrictFunctionType<{ (): void, (x: number): number }>, { (): void, (x: number): number }>(
		true
	)
})
it('returns T for special types', () => {
	testType.equal<NotStrictFunctionType<void>, void>(true)
	testType.equal<NotStrictFunctionType<unknown>, unknown>(true)
	testType.equal<NotStrictFunctionType<any>, any>(true)
	testType.equal<NotStrictFunctionType<never>, never>(true)
})

it('returns T for all other types', () => {
	testType.equal<NotStrictFunctionType<undefined>, undefined>(true)
	testType.equal<NotStrictFunctionType<null>, null>(true)
	testType.equal<NotStrictFunctionType<boolean>, boolean>(true)
	testType.equal<NotStrictFunctionType<true>, true>(true)
	testType.equal<NotStrictFunctionType<false>, false>(true)
	testType.equal<NotStrictFunctionType<number>, number>(true)
	testType.equal<NotStrictFunctionType<1>, 1>(true)
	testType.equal<NotStrictFunctionType<string>, string>(true)
	testType.equal<NotStrictFunctionType<''>, ''>(true)
	testType.equal<NotStrictFunctionType<symbol>, symbol>(true)
	testType.equal<NotStrictFunctionType<bigint>, bigint>(true)
	testType.equal<NotStrictFunctionType<1n>, 1n>(true)
	testType.equal<NotStrictFunctionType<{}>, {}>(true)
	testType.equal<NotStrictFunctionType<{ a: 1 }>, { a: 1 }>(true)
	testType.equal<NotStrictFunctionType<string[]>, string[]>(true)
	testType.equal<NotStrictFunctionType<[]>, []>(true)
})

it('returns T if T is union of function and other types', () => {
	testType.equal<NotStrictFunctionType<Function | { a: 1 }>, Function | { a: 1 }>(true)
})

it('returns T if T is intersection of function', () => {
	testType.equal<NotStrictFunctionType<Function & { a: 1 }>, Function & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotStrictFunctionType<Function, 1, 2>, 2>(true)
	testType.equal<NotStrictFunctionType<{}, 1, 2>, 1>(true)

	testType.equal<NotStrictFunctionType<any, 1, 2>, 1>(true)
	testType.equal<NotStrictFunctionType<unknown, 1, 2>, 1>(true)
	testType.equal<NotStrictFunctionType<never, 1, 2>, 1>(true)
	testType.equal<NotStrictFunctionType<void, 1, 2>, 1>(true)
})

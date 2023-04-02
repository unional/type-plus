import { testType, type AnyFunction, type FunctionType } from '../index.js'

it('returns T if T is Function', () => {
	testType.equal<FunctionType<Function>, Function>(true)
})

it('returns T if T is a function signature', () => {
	testType.equal<FunctionType<() => void>, () => void>(true)
	testType.equal<FunctionType<AnyFunction>, AnyFunction>(true)
})

it('returns never for special types', () => {
	testType.never<FunctionType<void>>(true)
	testType.never<FunctionType<unknown>>(true)
	testType.never<FunctionType<any>>(true)
	testType.never<FunctionType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<FunctionType<undefined>>(true)
	testType.never<FunctionType<null>>(true)
	testType.never<FunctionType<boolean>>(true)
	testType.never<FunctionType<true>>(true)
	testType.never<FunctionType<false>>(true)
	testType.never<FunctionType<number>>(true)
	testType.never<FunctionType<1>>(true)
	testType.never<FunctionType<string>>(true)
	testType.never<FunctionType<''>>(true)
	testType.never<FunctionType<symbol>>(true)
	testType.never<FunctionType<bigint>>(true)
	testType.never<FunctionType<{}>>(true)
	testType.never<FunctionType<string[]>>(true)
	testType.never<FunctionType<[]>>(true)
})

it('returns never if T is union of function and other types', () => {
	testType.never<FunctionType<Function | { a: 1 }>>(true)
})

it('returns T if T is function overloads', () => {
	testType.equal<FunctionType<{ (): void; (x: number): number }>, { (): void; (x: number): number }>(true)
	testType.equal<FunctionType<{ (): void; a: 1 }>, { (): void; a: 1 }>(true)
})

it('returns T if T is intersection of function', () => {
	testType.equal<FunctionType<Function & { a: 1 }>, Function & { a: 1 }>(true)
	testType.equal<FunctionType<Function & 1>, Function & 1>(true)
})

it('can override Then/Else', () => {
	testType.equal<FunctionType<Function, 1, 2>, 1>(true)
	testType.equal<FunctionType<0, 1, 2>, 2>(true)

	testType.equal<FunctionType<any, 1, 2>, 2>(true)
	testType.equal<FunctionType<unknown, 1, 2>, 2>(true)
	testType.equal<FunctionType<never, 1, 2>, 2>(true)
	testType.equal<FunctionType<void, 1, 2>, 2>(true)
})

test('union behavior of Function', () => {
	testType.equal<Function | undefined, Function | undefined>(true)
	testType.equal<Function | null, Function | null>(true)
	testType.equal<Function | boolean, Function | boolean>(true)
	testType.equal<Function | true, Function | true>(true)
	testType.equal<Function | false, Function | false>(true)
	testType.equal<Function | number, Function | number>(true)
	testType.equal<Function | 1, Function | 1>(true)
	testType.equal<Function | string, Function | string>(true)
	testType.equal<Function | '', Function | ''>(true)
	testType.equal<Function | symbol, Function | symbol>(true)
	testType.equal<Function | bigint, Function | bigint>(true)
	testType.equal<Function | 1n, Function | 1n>(true)
	testType.equal<Function | {}, Function | {}>(true)
	testType.equal<Function | { a: 1 }, Function | { a: 1 }>(true)
	testType.equal<Function | string[], Function | string[]>(true)
	testType.equal<Function | [], Function | []>(true)
	testType.equal<Function | Function, Function>(true)
	testType.equal<Function | (() => void), Function | (() => void)>(true)

	testType.equal<Function | any, any>(true)
	testType.equal<Function | unknown, unknown>(true)
	testType.equal<Function | never, Function>(true)
	testType.equal<Function | void, Function | void>(true)
})

test('intersection behavior of Function', () => {
	testType.equal<Function & undefined, never>(true)
	testType.equal<Function & null, never>(true)

	testType.equal<Function & boolean, Function & boolean>(true)
	testType.equal<Function & true, Function & true>(true)
	testType.equal<Function & false, Function & false>(true)

	testType.equal<Function & number, Function & number>(true)
	testType.equal<Function & 1, Function & 1>(true)
	testType.equal<Function & string, Function & string>(true)
	testType.equal<Function & '', Function & ''>(true)
	testType.equal<Function & symbol, Function & symbol>(true)
	testType.equal<Function & bigint, Function & bigint>(true)
	testType.equal<Function & 1n, Function & 1n>(true)

	testType.equal<Function & {}, Function>(true)

	testType.equal<Function & { a: 1 }, Function & { a: 1 }>(true)
	testType.equal<Function & string[], Function & string[]>(true)
	testType.equal<Function & [], Function & []>(true)
	testType.equal<Function & Function, Function>(true)
	testType.equal<Function & (() => void), Function & (() => void)>(true)

	testType.equal<Function & any, any>(true)
	testType.equal<Function & unknown, Function>(true)
	testType.equal<Function & never, never>(true)
	testType.equal<Function & void, Function & void>(true)
})

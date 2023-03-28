import { type, type AnyFunction, type FunctionType } from '../index.js'

it('returns T if T is Function', () => {
	type.equal<FunctionType<Function>, Function>(true)
})

it('returns T if T is a function signature', () => {
	type.equal<FunctionType<() => void>, () => void>(true)
	type.equal<FunctionType<AnyFunction>, AnyFunction>(true)
})

it('returns never for special types', () => {
	type.never<FunctionType<void>>(true)
	type.never<FunctionType<unknown>>(true)
	type.never<FunctionType<any>>(true)
	type.never<FunctionType<never>>(true)
})

it('returns never for other types', () => {
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

test('union behavior of Function', () => {
	type.equal<Function | undefined, Function | undefined>(true)
	type.equal<Function | null, Function | null>(true)
	type.equal<Function | boolean, Function | boolean>(true)
	type.equal<Function | true, Function | true>(true)
	type.equal<Function | false, Function | false>(true)
	type.equal<Function | number, Function | number>(true)
	type.equal<Function | 1, Function | 1>(true)
	type.equal<Function | string, Function | string>(true)
	type.equal<Function | '', Function | ''>(true)
	type.equal<Function | symbol, Function | symbol>(true)
	type.equal<Function | bigint, Function | bigint>(true)
	type.equal<Function | 1n, Function | 1n>(true)
	type.equal<Function | {}, Function | {}>(true)
	type.equal<Function | { a: 1 }, Function | { a: 1 }>(true)
	type.equal<Function | string[], Function | string[]>(true)
	type.equal<Function | [], Function | []>(true)
	type.equal<Function | Function, Function>(true)
	type.equal<Function | (() => void), Function | (() => void)>(true)

	type.equal<Function | any, any>(true)
	type.equal<Function | unknown, unknown>(true)
	type.equal<Function | never, Function>(true)
	type.equal<Function | void, Function | void>(true)
})

test('intersection behavior of Function', () => {
	type.equal<Function & undefined, never>(true)
	type.equal<Function & null, never>(true)

	type.equal<Function & boolean, Function & boolean>(true)
	type.equal<Function & true, Function & true>(true)
	type.equal<Function & false, Function & false>(true)

	type.equal<Function & number, Function & number>(true)
	type.equal<Function & 1, Function & 1>(true)
	type.equal<Function & string, Function & string>(true)
	type.equal<Function & '', Function & ''>(true)
	type.equal<Function & symbol, Function & symbol>(true)
	type.equal<Function & bigint, Function & bigint>(true)
	type.equal<Function & 1n, Function & 1n>(true)

	type.equal<Function & {}, Function>(true)

	type.equal<Function & { a: 1 }, Function & { a: 1 }>(true)
	type.equal<Function & string[], Function & string[]>(true)
	type.equal<Function & [], Function & []>(true)
	type.equal<Function & Function, Function>(true)
	type.equal<Function & (() => void), Function & (() => void)>(true)

	type.equal<Function & any, any>(true)
	type.equal<Function & unknown, Function>(true)
	type.equal<Function & never, never>(true)
	type.equal<Function & void, Function & void>(true)
})

it('returns never if T is union of function and other types', () => {
	type.never<FunctionType<Function | { a: 1 }>>(true)
})

it('returns T if T is function overloads', () => {
	type.equal<FunctionType<{ (): void; (x: number): number }>, { (): void; (x: number): number }>(true)
	type.equal<FunctionType<{ (): void; a: 1 }>, { (): void; a: 1 }>(true)
})

it('returns T if T is intersection of function', () => {
	type.equal<FunctionType<Function & { a: 1 }>, Function & { a: 1 }>(true)
	type.equal<FunctionType<Function & 1>, Function & 1>(true)
})

it('can override Then/Else', () => {
	type.equal<FunctionType<Function, 1, 2>, 1>(true)
	type.equal<FunctionType<0, 1, 2>, 2>(true)

	type.equal<FunctionType<any, 1, 2>, 2>(true)
	type.equal<FunctionType<unknown, 1, 2>, 2>(true)
	type.equal<FunctionType<never, 1, 2>, 2>(true)
	type.equal<FunctionType<void, 1, 2>, 2>(true)
})

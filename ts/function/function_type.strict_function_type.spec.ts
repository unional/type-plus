import { type, type AnyFunction, type StrictFunctionType } from '../index.js'

it('returns T if T is Function', () => {
	type.equal<StrictFunctionType<Function>, Function>(true)
})

it('returns never if T is a function signature', () => {
	type.never<StrictFunctionType<() => void>>(true)
	type.never<StrictFunctionType<AnyFunction>>(true)
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
	type.never<StrictFunctionType<{}>>(true)
	type.never<StrictFunctionType<string[]>>(true)
	type.never<StrictFunctionType<[]>>(true)
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
	type.never<StrictFunctionType<(() => void) | { a: 1 }>>(true)
})

it('returns never if T is function overloads', () => {
	type.never<StrictFunctionType<{ (): void; (x: number): number }>>(true)
	type.never<StrictFunctionType<{ (): void; a: 1 }>>(true)
})

it('returns never if T is intersection of function', () => {
	type.never<StrictFunctionType<(() => void) & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<StrictFunctionType<Function, 1, 2>, 1>(true)
	type.equal<StrictFunctionType<AnyFunction, 1, 2>, 2>(true)

	type.equal<StrictFunctionType<any, 1, 2>, 2>(true)
	type.equal<StrictFunctionType<unknown, 1, 2>, 2>(true)
	type.equal<StrictFunctionType<never, 1, 2>, 2>(true)
	type.equal<StrictFunctionType<void, 1, 2>, 2>(true)
})

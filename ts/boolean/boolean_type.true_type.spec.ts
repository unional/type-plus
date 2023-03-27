import { type, type TrueType } from '../index.js'

it('returns T if T is true', () => {
	type.equal<TrueType<true>, true>(true)
})

it('returns never if T is boolean or false', () => {
	type.never<TrueType<boolean>>(true)
	type.never<TrueType<false>>(true)
})

it('returns never for special types', () => {
	type.never<TrueType<void>>(true)
	type.never<TrueType<unknown>>(true)
	type.never<TrueType<any>>(true)
	type.never<TrueType<never>>(true)
})

it('returns never for other types', () => {
	type.never<TrueType<undefined>>(true)
	type.never<TrueType<null>>(true)
	type.never<TrueType<number>>(true)
	type.never<TrueType<1>>(true)
	type.never<TrueType<string>>(true)
	type.never<TrueType<''>>(true)
	type.never<TrueType<symbol>>(true)
	type.never<TrueType<bigint>>(true)
	type.never<TrueType<1n>>(true)
	type.never<TrueType<{}>>(true)
	type.never<TrueType<{ a: 1 }>>(true)
	type.never<TrueType<string[]>>(true)
	type.never<TrueType<[]>>(true)
	type.never<TrueType<Function>>(true)
	type.never<TrueType<() => void>>(true)
})

test('union behavior of true', () => {
	type.equal<true | undefined, true | undefined>(true)
	type.equal<true | null, true | null>(true)

	type.equal<true | boolean, boolean>(true)
	type.equal<true | true, true>(true)
	type.equal<true | false, boolean>(true)

	type.equal<true | number, true | number>(true)
	type.equal<true | 1, true | 1>(true)
	type.equal<true | string, true | string>(true)
	type.equal<true | '', true | ''>(true)
	type.equal<true | symbol, true | symbol>(true)
	type.equal<true | bigint, true | bigint>(true)
	type.equal<true | 1n, true | 1n>(true)
	type.equal<true | {}, true | {}>(true)
	type.equal<true | { a: 1 }, true | { a: 1 }>(true)
	type.equal<true | string[], true | string[]>(true)
	type.equal<true | [], true | []>(true)
	type.equal<true | Function, true | Function>(true)
	type.equal<true | (() => void), true | (() => void)>(true)

	type.equal<true | any, any>(true)
	type.equal<true | unknown, unknown>(true)
	type.equal<true | never, true>(true)
	type.equal<true | void, true | void>(true)
})

test('intersection behavior of true', () => {
	type.equal<true & undefined, never>(true)
	type.equal<true & null, never>(true)

	type.equal<true & boolean, true>(true)
	type.equal<true & true, true>(true)
	type.equal<true & false, never>(true)

	type.equal<true & number, never>(true)
	type.equal<true & 1, never>(true)
	type.equal<true & string, never>(true)
	type.equal<true & '', never>(true)
	type.equal<true & symbol, never>(true)
	type.equal<true & bigint, never>(true)
	type.equal<true & 1n, never>(true)

	type.equal<true & {}, true>(true)
	type.equal<true & { a: 1 }, true & { a: 1 }>(true)
	type.equal<true & string[], true & string[]>(true)
	type.equal<true & [], true & []>(true)
	type.equal<true & Function, true & Function>(true)
	type.equal<true & (() => void), true & (() => void)>(true)

	type.equal<true & any, any>(true)
	type.equal<true & unknown, true>(true)
	type.equal<true & never, never>(true)
	type.equal<true & void, never>(true)
})

it('returns never for union type', () => {
	type.never<TrueType<true | 1>>(true)
	type.never<TrueType<true | boolean>>(true)
})

it('returns never for intersection type', () => {
	type.never<TrueType<true & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<TrueType<true, 1, 2>, 1>(true)

	type.equal<TrueType<any, 1, 2>, 2>(true)
	type.equal<TrueType<unknown, 1, 2>, 2>(true)
	type.equal<TrueType<never, 1, 2>, 2>(true)
	type.equal<TrueType<void, 1, 2>, 2>(true)
})

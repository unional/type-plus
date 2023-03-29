import { type, type VoidType } from '../index.js'

it('returns T if T is void', () => {
	type.equal<VoidType<void>, void>(true)
})

it('returns never for other special types', () => {
	type.never<VoidType<any>>(true)
	type.never<VoidType<unknown>>(true)
	type.never<VoidType<never>>(true)
})

test('returns never for other types', () => {
	type.never<VoidType<undefined>>(true)
	type.never<VoidType<null>>(true)
	type.never<VoidType<number>>(true)
	type.never<VoidType<1>>(true)
	type.never<VoidType<boolean>>(true)
	type.never<VoidType<true>>(true)
	type.never<VoidType<false>>(true)
	type.never<VoidType<string>>(true)
	type.never<VoidType<''>>(true)
	type.never<VoidType<symbol>>(true)
	type.never<VoidType<bigint>>(true)
	type.never<VoidType<1n>>(true)
	type.never<VoidType<{}>>(true)
	type.never<VoidType<string[]>>(true)
	type.never<VoidType<[]>>(true)
	type.never<VoidType<Function>>(true)
	type.never<VoidType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<VoidType<void | 1>>(true)
})

it('returns T for intersection type', () => {
	type.equal<VoidType<void & { a: 1 }>, void & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	type.equal<VoidType<void, 1, 2>, 1>(true)
	type.equal<VoidType<0, 1, 2>, 2>(true)

	type.equal<VoidType<any, 1, 2>, 2>(true)
	type.equal<VoidType<unknown, 1, 2>, 2>(true)
	type.equal<VoidType<never, 1, 2>, 2>(true)
})

test('union behavior of void', () => {
	type.equal<void | undefined, void | undefined>(true)
	type.equal<void | null, void | null>(true)
	type.equal<void | boolean, void | boolean>(true)
	type.equal<void | true, void | true>(true)
	type.equal<void | false, void | false>(true)
	type.equal<void | number, void | number>(true)
	type.equal<void | 1, void | 1>(true)
	type.equal<void | string, void | string>(true)
	type.equal<void | '', void | ''>(true)
	type.equal<void | symbol, void | symbol>(true)
	type.equal<void | bigint, void | bigint>(true)
	type.equal<void | 1n, void | 1n>(true)
	type.equal<void | {}, void | {}>(true)
	type.equal<void | { a: 1 }, void | { a: 1 }>(true)
	type.equal<void | string[], void | string[]>(true)
	type.equal<void | [], void | []>(true)
	type.equal<void | Function, void | Function>(true)
	type.equal<void | (() => void), void | (() => void)>(true)

	type.equal<void | any, any>(true)
	type.equal<void | unknown, unknown>(true)
	type.equal<void | never, void>(true)
	type.equal<void | void, void | void>(true)
})

test('intersection behavior of void', () => {
	type.equal<void & undefined, undefined>(true)
	type.equal<void & null, never>(true)

	type.equal<void & boolean, never>(true)
	type.equal<void & true, never>(true)
	type.equal<void & false, never>(true)
	type.equal<void & number, never>(true)
	type.equal<void & 1, never>(true)
	type.equal<void & string, never>(true)
	type.equal<void & '', never>(true)

	type.equal<void & symbol, never>(true)

	type.equal<void & bigint, never>(true)
	type.equal<void & 1n, never>(true)

	type.equal<void & {}, void & {}>(true)

	type.equal<void & { a: 1 }, void & { a: 1 }>(true)
	type.equal<void & string[], void & string[]>(true)
	type.equal<void & [], void & []>(true)
	type.equal<void & Function, void & Function>(true)
	type.equal<void & (() => void), void & (() => void)>(true)

	type.equal<void & any, any>(true)
	type.equal<void & unknown, void>(true)
	type.equal<void & never, never>(true)
	type.equal<void & void, void>(true)
})

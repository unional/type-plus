import { testType, type VoidType } from '../index.js'

it('returns T if T is void', () => {
	testType.equal<VoidType<void>, void>(true)
})

it('returns never for other special types', () => {
	testType.never<VoidType<any>>(true)
	testType.never<VoidType<unknown>>(true)
	testType.never<VoidType<never>>(true)
})

test('returns never for other types', () => {
	testType.never<VoidType<undefined>>(true)
	testType.never<VoidType<null>>(true)
	testType.never<VoidType<number>>(true)
	testType.never<VoidType<1>>(true)
	testType.never<VoidType<boolean>>(true)
	testType.never<VoidType<true>>(true)
	testType.never<VoidType<false>>(true)
	testType.never<VoidType<string>>(true)
	testType.never<VoidType<''>>(true)
	testType.never<VoidType<symbol>>(true)
	testType.never<VoidType<bigint>>(true)
	testType.never<VoidType<1n>>(true)
	testType.never<VoidType<{}>>(true)
	testType.never<VoidType<string[]>>(true)
	testType.never<VoidType<[]>>(true)
	testType.never<VoidType<Function>>(true)
	testType.never<VoidType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<VoidType<void | 1>>(true)
})

it('returns T for intersection type', () => {
	testType.equal<VoidType<void & { a: 1 }>, void & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<VoidType<void, 1, 2>, 1>(true)
	testType.equal<VoidType<0, 1, 2>, 2>(true)

	testType.equal<VoidType<any, 1, 2>, 2>(true)
	testType.equal<VoidType<unknown, 1, 2>, 2>(true)
	testType.equal<VoidType<never, 1, 2>, 2>(true)
})

test('union behavior of void', () => {
	testType.equal<void | undefined, void | undefined>(true)
	testType.equal<void | null, void | null>(true)
	testType.equal<void | boolean, void | boolean>(true)
	testType.equal<void | true, void | true>(true)
	testType.equal<void | false, void | false>(true)
	testType.equal<void | number, void | number>(true)
	testType.equal<void | 1, void | 1>(true)
	testType.equal<void | string, void | string>(true)
	testType.equal<void | '', void | ''>(true)
	testType.equal<void | symbol, void | symbol>(true)
	testType.equal<void | bigint, void | bigint>(true)
	testType.equal<void | 1n, void | 1n>(true)
	testType.equal<void | {}, void | {}>(true)
	testType.equal<void | { a: 1 }, void | { a: 1 }>(true)
	testType.equal<void | string[], void | string[]>(true)
	testType.equal<void | [], void | []>(true)
	testType.equal<void | Function, void | Function>(true)
	testType.equal<void | (() => void), void | (() => void)>(true)

	testType.equal<void | any, any>(true)
	testType.equal<void | unknown, unknown>(true)
	testType.equal<void | never, void>(true)
	testType.equal<void | void, void | void>(true)
})

test('intersection behavior of void', () => {
	testType.equal<void & undefined, undefined>(true)
	testType.equal<void & null, never>(true)

	testType.equal<void & boolean, never>(true)
	testType.equal<void & true, never>(true)
	testType.equal<void & false, never>(true)
	testType.equal<void & number, never>(true)
	testType.equal<void & 1, never>(true)
	testType.equal<void & string, never>(true)
	testType.equal<void & '', never>(true)

	testType.equal<void & symbol, never>(true)

	testType.equal<void & bigint, never>(true)
	testType.equal<void & 1n, never>(true)

	testType.equal<void & {}, void & {}>(true)

	testType.equal<void & { a: 1 }, void & { a: 1 }>(true)
	testType.equal<void & string[], void & string[]>(true)
	testType.equal<void & [], void & []>(true)
	testType.equal<void & Function, void & Function>(true)
	testType.equal<void & (() => void), void & (() => void)>(true)

	testType.equal<void & any, any>(true)
	testType.equal<void & unknown, void>(true)
	testType.equal<void & never, never>(true)
	testType.equal<void & void, void>(true)
})

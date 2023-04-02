import { testType, type NullType } from '../index.js'

it('returns T if T is null', () => {
	testType.equal<NullType<null>, null>(true)
})

it('returns never for special types', () => {
	testType.never<NullType<any>>(true)
	testType.never<NullType<unknown>>(true)
	testType.never<NullType<void>>(true)
	testType.never<NullType<never>>(true)
})

test('returns never for other types', () => {
	testType.never<NullType<undefined>>(true)
	testType.never<NullType<number>>(true)
	testType.never<NullType<boolean>>(true)
	testType.never<NullType<true>>(true)
	testType.never<NullType<false>>(true)
	testType.never<NullType<string>>(true)
	testType.never<NullType<''>>(true)
	testType.never<NullType<symbol>>(true)
	testType.never<NullType<bigint>>(true)
	testType.never<NullType<{}>>(true)
	testType.never<NullType<string[]>>(true)
	testType.never<NullType<[]>>(true)
	testType.never<NullType<Function>>(true)
	testType.never<NullType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<NullType<null | 1>>(true)
})

it('can override Then/Else', () => {
	testType.equal<NullType<null, 1, 2>, 1>(true)

	testType.equal<NullType<any, 1, 2>, 2>(true)
	testType.equal<NullType<unknown, 1, 2>, 2>(true)
	testType.equal<NullType<never, 1, 2>, 2>(true)
	testType.equal<NullType<void, 1, 2>, 2>(true)
})

test('union behavior of null', () => {
	testType.equal<null | undefined, null | undefined>(true)
	testType.equal<null | null, null>(true)
	testType.equal<null | boolean, null | boolean>(true)
	testType.equal<null | true, null | true>(true)
	testType.equal<null | false, null | false>(true)
	testType.equal<null | number, null | number>(true)
	testType.equal<null | 1, null | 1>(true)
	testType.equal<null | string, null | string>(true)
	testType.equal<null | '', null | ''>(true)
	testType.equal<null | symbol, null | symbol>(true)
	testType.equal<null | bigint, null | bigint>(true)
	testType.equal<null | 1n, null | 1n>(true)
	testType.equal<null | {}, null | {}>(true)
	testType.equal<null | { a: 1 }, null | { a: 1 }>(true)
	testType.equal<null | string[], null | string[]>(true)
	testType.equal<null | [], null | []>(true)
	testType.equal<null | null, null>(true)
	testType.equal<null | (() => void), null | (() => void)>(true)

	testType.equal<null | any, any>(true)
	testType.equal<null | unknown, unknown>(true)
	testType.equal<null | never, null>(true)
	testType.equal<null | void, null | void>(true)
})

test('intersection behavior of null', () => {
	testType.equal<null & undefined, never>(true)
	testType.equal<null & null, null>(true)

	testType.equal<null & boolean, never>(true)
	testType.equal<null & true, never>(true)
	testType.equal<null & false, never>(true)

	testType.equal<null & number, never>(true)
	testType.equal<null & 1, never>(true)
	testType.equal<null & string, never>(true)
	testType.equal<null & '', never>(true)
	testType.equal<null & symbol, never>(true)
	testType.equal<null & bigint, never>(true)
	testType.equal<null & 1n, never>(true)

	testType.equal<null & {}, never>(true)

	testType.equal<null & { a: 1 }, never>(true)
	testType.equal<null & string[], never>(true)
	testType.equal<null & [], never>(true)
	testType.equal<null & null, null>(true)
	testType.equal<null & (() => void), never>(true)

	testType.equal<null & any, any>(true)
	testType.equal<null & unknown, null>(true)
	testType.equal<null & never, never>(true)
	testType.equal<null & void, never>(true)
})

import { type, type UnknownType } from '../index.js'

it('returns T if T is unknown', () => {
	type.equal<UnknownType<unknown>, unknown>(true)
})

it('returns never for other special types', () => {
	type.never<UnknownType<any>>(true)
	type.never<UnknownType<void>>(true)
	type.never<UnknownType<never>>(true)
})

it('returns never for other types', () => {
	type.never<UnknownType<undefined>>(true)
	type.never<UnknownType<null>>(true)
	type.never<UnknownType<number>>(true)
	type.never<UnknownType<1>>(true)
	type.never<UnknownType<boolean>>(true)
	type.never<UnknownType<true>>(true)
	type.never<UnknownType<false>>(true)
	type.never<UnknownType<string>>(true)
	type.never<UnknownType<''>>(true)
	type.never<UnknownType<symbol>>(true)
	type.never<UnknownType<bigint>>(true)
	type.never<UnknownType<1n>>(true)
	type.never<UnknownType<{}>>(true)
	type.never<UnknownType<string[]>>(true)
	type.never<UnknownType<[]>>(true)
	type.never<UnknownType<Function>>(true)
	type.never<UnknownType<() => void>>(true)
})

it('returns unknown for union type', () => {
	type.equal<UnknownType<unknown | 1>, unknown>(true)
})

it('returns never as unknown & any => any', () => {
	type.never<UnknownType<unknown & any>>(true)
})

it('returns never as unknown & void => void', () => {
	type.never<UnknownType<unknown & void>>(true)
})

it('returns never as unknown & never => never', () => {
	type.equal<UnknownType<unknown & never>, unknown & never, never>(true)
})

it('returns never as unknown & <others> => <others>', () => {
	type.equal<unknown & null, null>(true)
	type.equal<unknown & number, number>(true)
	type.equal<unknown & 1, 1>(true)
	type.equal<unknown & boolean, boolean>(true)
	type.equal<unknown & true, true>(true)
	type.equal<unknown & false, false>(true)
	type.equal<unknown & string, string>(true)
	type.equal<unknown & '', ''>(true)
	type.equal<unknown & symbol, symbol>(true)
	type.equal<unknown & bigint, bigint>(true)
	type.equal<unknown & 1n, 1n>(true)
	type.equal<unknown & {}, unknown & {}>(true)
	type.equal<unknown & { a: 1 }, unknown & { a: 1 }>(true)
	type.equal<unknown & string[], unknown & string[]>(true)
	type.equal<unknown & [], unknown & []>(true)
	type.equal<unknown & Function, unknown & Function>(true)
	type.equal<unknown & (() => void), unknown & (() => void)>(true)
})

it('can override Then/Else', () => {
	type.equal<UnknownType<unknown, 1, 2>, 1>(true)
	type.equal<UnknownType<0, 1, 2>, 2>(true)

	type.equal<UnknownType<any, 1, 2>, 2>(true)
	type.equal<UnknownType<never, 1, 2>, 2>(true)
	type.equal<UnknownType<void, 1, 2>, 2>(true)
})

test('union behavior of unknown', () => {
	type.equal<unknown | null, unknown>(true)
	type.equal<unknown | boolean, unknown>(true)
	type.equal<unknown | true, unknown>(true)
	type.equal<unknown | false, unknown>(true)
	type.equal<unknown | number, unknown>(true)
	type.equal<unknown | 1, unknown>(true)
	type.equal<unknown | string, unknown>(true)
	type.equal<unknown | '', unknown>(true)
	type.equal<unknown | symbol, unknown>(true)
	type.equal<unknown | bigint, unknown>(true)
	type.equal<unknown | 1n, unknown>(true)
	type.equal<unknown | {}, unknown>(true)
	type.equal<unknown | { a: 1 }, unknown>(true)
	type.equal<unknown | string[], unknown>(true)
	type.equal<unknown | [], unknown>(true)
	type.equal<unknown | Function, unknown>(true)
	type.equal<unknown | (() => void), unknown>(true)

	type.equal<unknown | any, any>(true)
	type.equal<unknown | unknown, unknown>(true)
	type.equal<unknown | never, unknown>(true)
	type.equal<unknown | void, unknown>(true)
})

test('intersection behavior of unknown', () => {
	type.equal<unknown & null, null>(true)
	type.equal<unknown & boolean, boolean>(true)
	type.equal<unknown & true, true>(true)
	type.equal<unknown & false, false>(true)
	type.equal<unknown & number, number>(true)
	type.equal<unknown & 1, 1>(true)
	type.equal<unknown & string, string>(true)
	type.equal<unknown & '', ''>(true)
	type.equal<unknown & symbol, symbol>(true)
	type.equal<unknown & bigint, bigint>(true)
	type.equal<unknown & 1n, 1n>(true)
	type.equal<unknown & {}, {}>(true)
	type.equal<unknown & { a: 1 }, { a: 1 }>(true)
	type.equal<unknown & string[], string[]>(true)
	type.equal<unknown & [], []>(true)
	type.equal<unknown & Function, Function>(true)
	type.equal<unknown & (() => void), () => void>(true)

	type.equal<unknown & any, any>(true)
	type.equal<unknown & unknown, unknown>(true)
	type.equal<unknown & never, never>(true)
	type.equal<unknown & void, void>(true)
})

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

test('union behavior of undefined', () => {
	type.equal<undefined | null, undefined | null>(true)
	type.equal<undefined | boolean, undefined | boolean>(true)
	type.equal<undefined | true, undefined | true>(true)
	type.equal<undefined | false, undefined | false>(true)
	type.equal<undefined | number, undefined | number>(true)
	type.equal<undefined | 1, undefined | 1>(true)
	type.equal<undefined | string, undefined | string>(true)
	type.equal<undefined | '', undefined | ''>(true)
	type.equal<undefined | symbol, undefined | symbol>(true)
	type.equal<undefined | bigint, undefined | bigint>(true)
	type.equal<undefined | 1n, undefined | 1n>(true)
	type.equal<undefined | {}, undefined | {}>(true)
	type.equal<undefined | { a: 1 }, undefined | { a: 1 }>(true)
	type.equal<undefined | string[], undefined | string[]>(true)
	type.equal<undefined | [], undefined | []>(true)
	type.equal<undefined | Function, undefined | Function>(true)
	type.equal<undefined | (() => void), undefined | (() => void)>(true)

	type.equal<undefined | any, any>(true)
	type.equal<undefined | unknown, unknown>(true)
	type.equal<undefined | never, undefined>(true)
	type.equal<undefined | void, void>(true)
})

test('intersection behavior of undefined', () => {
	type.equal<undefined & null, never>(true)
	type.equal<undefined & boolean, never>(true)
	type.equal<undefined & true, never>(true)
	type.equal<undefined & false, never>(true)
	type.equal<undefined & number, never>(true)
	type.equal<undefined & 1, never>(true)
	type.equal<undefined & string, never>(true)
	type.equal<undefined & '', never>(true)
	type.equal<undefined & symbol, never>(true)
	type.equal<undefined & bigint, never>(true)
	type.equal<undefined & 1n, never>(true)
	type.equal<undefined & {}, never>(true)
	type.equal<undefined & { a: 1 }, never>(true)
	type.equal<undefined & string[], never>(true)
	type.equal<undefined & [], never>(true)
	type.equal<undefined & Function, never>(true)
	type.equal<undefined & (() => void), never>(true)

	type.equal<undefined & any, any>(true)
	type.equal<undefined & unknown, undefined>(true)
	type.equal<undefined & never, never>(true)
	type.equal<undefined & void, undefined>(true)
})

it('returns never for union type', () => {
	type.never<UnknownType<undefined | 1>>(true)
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

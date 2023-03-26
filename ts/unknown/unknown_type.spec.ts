import { type, type UnknownType } from '../index.js'

it('returns T if T is unknown', () => {
	type.equal<UnknownType<unknown>, unknown>(true)
})

it('returns never for other special types', () => {
	type.never<UnknownType<any>>(true)
	type.never<UnknownType<void>>(true)
	type.never<UnknownType<never>>(true)
})

test('returns never for other types', () => {
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

it('returns never for union type', () => {
	type.never<UnknownType<undefined | 1>>(true)
})

it('returns never as unknown & any => any', () => {
	type.equal<unknown & any, any>(true)
	type.never<UnknownType<unknown & any>>(true)
})

it('returns never as unknown & void => void', () => {
	type.equal<unknown & void, void>(true)
	type.never<UnknownType<unknown & void>>(true)
})

it('returns never as unknown & never => never', () => {
	type.equal<UnknownType<unknown & never>, unknown & never, never>(true)
})

it('returns never as unknown & <others> => <others>', () => {
	type.equal<unknown & null, null>(true)
	type.never<UnknownType<unknown & null>>(true)
	type.equal<unknown & number, number>(true)
	type.never<UnknownType<unknown & number>>(true)
	type.equal<unknown & 1, 1>(true)
	type.never<UnknownType<unknown & 1>>(true)
	type.equal<unknown & boolean, boolean>(true)
	type.never<UnknownType<unknown & boolean>>(true)
	type.equal<unknown & true, true>(true)
	type.never<UnknownType<unknown & true>>(true)
	type.equal<unknown & false, false>(true)
	type.never<UnknownType<unknown & false>>(true)
	type.equal<unknown & string, string>(true)
	type.never<UnknownType<unknown & string>>(true)
	type.equal<unknown & '', ''>(true)
	type.never<UnknownType<unknown & ''>>(true)
	type.equal<unknown & symbol, symbol>(true)
	type.never<UnknownType<unknown & symbol>>(true)
	type.equal<unknown & bigint, bigint>(true)
	type.never<UnknownType<unknown & bigint>>(true)
	type.equal<unknown & 1n, 1n>(true)
	type.never<UnknownType<unknown & 1n>>(true)
	type.equal<unknown & {}, unknown & {}>(true)
	type.never<UnknownType<unknown & {}>>(true)
	type.equal<unknown & { a: 1 }, unknown & { a: 1 }>(true)
	type.never<UnknownType<unknown & { a: 1 }>>(true)
	type.equal<unknown & string[], unknown & string[]>(true)
	type.never<UnknownType<unknown & string[]>>(true)
	type.equal<unknown & [], unknown & []>(true)
	type.never<UnknownType<unknown & []>>(true)
	type.equal<unknown & Function, unknown & Function>(true)
	type.never<UnknownType<unknown & Function>>(true)
	type.equal<unknown & (() => void), unknown & (() => void)>(true)
	type.never<UnknownType<unknown & (() => void)>>(true)
})

it('can override Then/Else', () => {
	type.equal<UnknownType<unknown, 1, 2>, 1>(true)
	type.equal<UnknownType<0, 1, 2>, 2>(true)

	type.equal<UnknownType<any, 1, 2>, 2>(true)
	type.equal<UnknownType<never, 1, 2>, 2>(true)
	type.equal<UnknownType<void, 1, 2>, 2>(true)
})

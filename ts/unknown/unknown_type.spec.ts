import { it } from '@jest/globals'
import { testType, type UnknownType } from '../index.js'

it('returns T if T is unknown', () => {
	testType.equal<UnknownType<unknown>, unknown>(true)
})

it('returns never for other special types', () => {
	testType.never<UnknownType<any>>(true)
	testType.never<UnknownType<void>>(true)
	testType.never<UnknownType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<UnknownType<undefined>>(true)
	testType.never<UnknownType<null>>(true)
	testType.never<UnknownType<number>>(true)
	testType.never<UnknownType<1>>(true)
	testType.never<UnknownType<boolean>>(true)
	testType.never<UnknownType<true>>(true)
	testType.never<UnknownType<false>>(true)
	testType.never<UnknownType<string>>(true)
	testType.never<UnknownType<''>>(true)
	testType.never<UnknownType<symbol>>(true)
	testType.never<UnknownType<bigint>>(true)
	testType.never<UnknownType<1n>>(true)
	testType.never<UnknownType<{}>>(true)
	testType.never<UnknownType<string[]>>(true)
	testType.never<UnknownType<[]>>(true)
	testType.never<UnknownType<Function>>(true)
	testType.never<UnknownType<() => void>>(true)
})

it('returns unknown for union type', () => {
	testType.equal<UnknownType<unknown | 1>, unknown>(true)
})

it('returns never as unknown & any => any', () => {
	testType.never<UnknownType<unknown & any>>(true)
})

it('returns never as unknown & void => void', () => {
	testType.never<UnknownType<unknown & void>>(true)
})

it('returns never as unknown & never => never', () => {
	testType.equal<UnknownType<unknown & never>, unknown & never, never>(true)
})

it('returns never as unknown & <others> => <others>', () => {
	testType.equal<unknown & null, null>(true)
	testType.equal<unknown & number, number>(true)
	testType.equal<unknown & 1, 1>(true)
	testType.equal<unknown & boolean, boolean>(true)
	testType.equal<unknown & true, true>(true)
	testType.equal<unknown & false, false>(true)
	testType.equal<unknown & string, string>(true)
	testType.equal<unknown & '', ''>(true)
	testType.equal<unknown & symbol, symbol>(true)
	testType.equal<unknown & bigint, bigint>(true)
	testType.equal<unknown & 1n, 1n>(true)
	testType.equal<unknown & {}, unknown & {}>(true)
	testType.equal<unknown & { a: 1 }, unknown & { a: 1 }>(true)
	testType.equal<unknown & string[], unknown & string[]>(true)
	testType.equal<unknown & [], unknown & []>(true)
	testType.equal<unknown & Function, unknown & Function>(true)
	testType.equal<unknown & (() => void), unknown & (() => void)>(true)
})

it('can override Then/Else', () => {
	testType.equal<UnknownType<unknown, 1, 2>, 1>(true)
	testType.equal<UnknownType<0, 1, 2>, 2>(true)

	testType.equal<UnknownType<any, 1, 2>, 2>(true)
	testType.equal<UnknownType<never, 1, 2>, 2>(true)
	testType.equal<UnknownType<void, 1, 2>, 2>(true)
})

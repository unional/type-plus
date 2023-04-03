import { it } from '@jest/globals'
import { testType, type NotUnknownType } from '../index.js'

it('returns never for unknown', () => {
	testType.never<NotUnknownType<unknown>>(true)
})

it('returns T for other special types', () => {
	testType.equal<NotUnknownType<any>, any>(true)
	testType.equal<NotUnknownType<void>, void>(true)
	testType.equal<NotUnknownType<never>, never>(true)
})

it('returns T for other types', () => {
	testType.equal<NotUnknownType<null>, null>(true)
	testType.equal<NotUnknownType<number>, number>(true)
	testType.equal<NotUnknownType<boolean>, boolean>(true)
	testType.equal<NotUnknownType<true>, true>(true)
	testType.equal<NotUnknownType<false>, false>(true)
	testType.equal<NotUnknownType<string>, string>(true)
	testType.equal<NotUnknownType<''>, ''>(true)
	testType.equal<NotUnknownType<symbol>, symbol>(true)
	testType.equal<NotUnknownType<bigint>, bigint>(true)
	testType.equal<NotUnknownType<{}>, {}>(true)
	testType.equal<NotUnknownType<string[]>, string[]>(true)
	testType.equal<NotUnknownType<[]>, []>(true)
	testType.equal<NotUnknownType<Function>, Function>(true)
	testType.equal<NotUnknownType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotUnknownType<undefined | 1>, undefined | 1>(true)
})

it('returns T as unknown & any => any', () => {
	testType.equal<NotUnknownType<unknown & any>, unknown & any, any>(true)
})

it('returns T as unknown & void => void', () => {
	testType.equal<NotUnknownType<unknown & void>, unknown & void, void>(true)
})

it('returns T as unknown & never => never', () => {
	testType.equal<NotUnknownType<unknown & never>, unknown & never, never>(true)
})

it('returns T as unknown & <others> => <others>', () => {
	testType.equal<NotUnknownType<unknown & null>, unknown & null, null>(true)
	testType.equal<NotUnknownType<unknown & number>, unknown & number, number>(true)
	testType.equal<NotUnknownType<unknown & 1>, unknown & 1, 1>(true)
	testType.equal<NotUnknownType<unknown & boolean>, unknown & boolean, boolean>(true)
	testType.equal<NotUnknownType<unknown & true>, unknown & true, true>(true)
	testType.equal<NotUnknownType<unknown & false>, unknown & false, false>(true)
	testType.equal<NotUnknownType<unknown & string>, unknown & string, string>(true)
	testType.equal<NotUnknownType<unknown & ''>, unknown & '', ''>(true)
	testType.equal<NotUnknownType<unknown & symbol>, unknown & symbol, symbol>(true)
	testType.equal<NotUnknownType<unknown & bigint>, unknown & bigint, bigint>(true)
	testType.equal<NotUnknownType<unknown & 1n>, unknown & 1n, 1n>(true)
	testType.equal<NotUnknownType<unknown & {}>, unknown & {}, {}>(true)
	testType.equal<NotUnknownType<unknown & { a: 1 }>, unknown & { a: 1 }, { a: 1 }>(true)
	testType.equal<NotUnknownType<unknown & string[]>, unknown & string[], string[]>(true)
	testType.equal<NotUnknownType<unknown & []>, unknown & [], []>(true)
	testType.equal<NotUnknownType<unknown & Function>, unknown & Function, Function>(true)
	testType.equal<NotUnknownType<unknown & (() => void)>, unknown & (() => void), () => void>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotUnknownType<unknown, 1, 2>, 2>(true)
	testType.equal<NotUnknownType<number, 1, 2>, 1>(true)

	testType.equal<NotUnknownType<any, 1, 2>, 1>(true)
	testType.equal<NotUnknownType<never, 1, 2>, 1>(true)
	testType.equal<NotUnknownType<void, 1, 2>, 1>(true)
})

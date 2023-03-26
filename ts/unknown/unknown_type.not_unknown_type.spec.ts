import { type, type NotUnknownType } from '../index.js'

it('returns never for unknown', () => {
	type.never<NotUnknownType<unknown>>(true)
})

it('returns T for other special types', () => {
	type.equal<NotUnknownType<any>, any>(true)
	type.equal<NotUnknownType<void>, void>(true)
	type.equal<NotUnknownType<never>, never>(true)
})

test('returns T for other types', () => {
	type.equal<NotUnknownType<null>, null>(true)
	type.equal<NotUnknownType<number>, number>(true)
	type.equal<NotUnknownType<boolean>, boolean>(true)
	type.equal<NotUnknownType<true>, true>(true)
	type.equal<NotUnknownType<false>, false>(true)
	type.equal<NotUnknownType<string>, string>(true)
	type.equal<NotUnknownType<''>, ''>(true)
	type.equal<NotUnknownType<symbol>, symbol>(true)
	type.equal<NotUnknownType<bigint>, bigint>(true)
	type.equal<NotUnknownType<{}>, {}>(true)
	type.equal<NotUnknownType<string[]>, string[]>(true)
	type.equal<NotUnknownType<[]>, []>(true)
	type.equal<NotUnknownType<Function>, Function>(true)
	type.equal<NotUnknownType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotUnknownType<undefined | 1>, undefined | 1>(true)
})

it('returns T as unknown & any => any', () => {
	type.equal<NotUnknownType<unknown & any>, unknown & any, any>(true)
})

it('returns T as unknown & void => void', () => {
	type.equal<NotUnknownType<unknown & void>, unknown & void, void>(true)
})

it('returns T as unknown & never => never', () => {
	type.equal<NotUnknownType<unknown & never>, unknown & never, never>(true)
})

it('returns T as unknown & <others> => <others>', () => {
	type.equal<NotUnknownType<unknown & null>, unknown & null, null>(true)
	type.equal<NotUnknownType<unknown & number>, unknown & number, number>(true)
	type.equal<NotUnknownType<unknown & 1>, unknown & 1, 1>(true)
	type.equal<NotUnknownType<unknown & boolean>, unknown & boolean, boolean>(true)
	type.equal<NotUnknownType<unknown & true>, unknown & true, true>(true)
	type.equal<NotUnknownType<unknown & false>, unknown & false, false>(true)
	type.equal<NotUnknownType<unknown & string>, unknown & string, string>(true)
	type.equal<NotUnknownType<unknown & ''>, unknown & '', ''>(true)
	type.equal<NotUnknownType<unknown & symbol>, unknown & symbol, symbol>(true)
	type.equal<NotUnknownType<unknown & bigint>, unknown & bigint, bigint>(true)
	type.equal<NotUnknownType<unknown & 1n>, unknown & 1n, 1n>(true)
	type.equal<NotUnknownType<unknown & {}>, unknown & {}, {}>(true)
	type.equal<NotUnknownType<unknown & { a: 1 }>, unknown & { a: 1 }, { a: 1 }>(true)
	type.equal<NotUnknownType<unknown & string[]>, unknown & string[], string[]>(true)
	type.equal<NotUnknownType<unknown & []>, unknown & [], []>(true)
	type.equal<NotUnknownType<unknown & Function>, unknown & Function, Function>(true)
	type.equal<NotUnknownType<unknown & (() => void)>, unknown & (() => void), () => void>(true)
})

it('can override Then/Else', () => {
	type.equal<NotUnknownType<unknown, 1, 2>, 2>(true)
	type.equal<NotUnknownType<number, 1, 2>, 1>(true)

	type.equal<NotUnknownType<any, 1, 2>, 1>(true)
	type.equal<NotUnknownType<never, 1, 2>, 1>(true)
	type.equal<NotUnknownType<void, 1, 2>, 1>(true)
})

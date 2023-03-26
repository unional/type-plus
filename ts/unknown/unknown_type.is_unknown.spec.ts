import { type, type IsUnknown } from '../index.js'

it('returns true for unknown', () => {
	type.true<IsUnknown<unknown>>(true)
})

it('returns false for other special types', () => {
	type.false<IsUnknown<any>>(true)
	type.false<IsUnknown<void>>(true)
	type.false<IsUnknown<never>>(true)
})

test('returns false for other types', () => {
	type.false<IsUnknown<null>>(true)
	type.false<IsUnknown<number>>(true)
	type.false<IsUnknown<boolean>>(true)
	type.false<IsUnknown<true>>(true)
	type.false<IsUnknown<false>>(true)
	type.false<IsUnknown<string>>(true)
	type.false<IsUnknown<''>>(true)
	type.false<IsUnknown<symbol>>(true)
	type.false<IsUnknown<bigint>>(true)
	type.false<IsUnknown<{}>>(true)
	type.false<IsUnknown<string[]>>(true)
	type.false<IsUnknown<[]>>(true)
	type.false<IsUnknown<Function>>(true)
	type.false<IsUnknown<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsUnknown<undefined | 1>>(true)
})

it('returns false as unknown & any => any', () => {
	type.equal<unknown & any, any>(true)
	type.false<IsUnknown<unknown & any>>(true)
})

it('returns true as unknown & void => void', () => {
	type.equal<unknown & void, void>(true)
	type.false<IsUnknown<unknown & void>>(true)
})

it('returns false as unknown & never => never', () => {
	type.equal<unknown & never, never>(true)
	type.false<IsUnknown<unknown & never>>(true)
})

it('returns false as unknown & <others> => <other>', () => {
	type.equal<unknown & null, null>(true)
	type.false<IsUnknown<unknown & null>>(true)
	type.equal<unknown & number, number>(true)
	type.false<IsUnknown<unknown & number>>(true)
	type.equal<unknown & 1, 1>(true)
	type.false<IsUnknown<unknown & 1>>(true)
	type.equal<unknown & boolean, boolean>(true)
	type.false<IsUnknown<unknown & boolean>>(true)
	type.equal<unknown & true, true>(true)
	type.false<IsUnknown<unknown & true>>(true)
	type.equal<unknown & false, false>(true)
	type.false<IsUnknown<unknown & false>>(true)
	type.equal<unknown & string, string>(true)
	type.false<IsUnknown<unknown & string>>(true)
	type.equal<unknown & '', ''>(true)
	type.false<IsUnknown<unknown & ''>>(true)
	type.equal<unknown & symbol, symbol>(true)
	type.false<IsUnknown<unknown & symbol>>(true)
	type.equal<unknown & bigint, bigint>(true)
	type.false<IsUnknown<unknown & bigint>>(true)
	type.equal<unknown & 1n, 1n>(true)
	type.false<IsUnknown<unknown & 1n>>(true)
	type.equal<unknown & {}, unknown & {}>(true)
	type.false<IsUnknown<unknown & {}>>(true)
	type.equal<unknown & { a: 1 }, unknown & { a: 1 }>(true)
	type.false<IsUnknown<unknown & { a: 1 }>>(true)
	type.equal<unknown & string[], unknown & string[]>(true)
	type.false<IsUnknown<unknown & string[]>>(true)
	type.equal<unknown & [], unknown & []>(true)
	type.false<IsUnknown<unknown & []>>(true)
	type.equal<unknown & Function, unknown & Function>(true)
	type.false<IsUnknown<unknown & Function>>(true)
	type.equal<unknown & (() => void), unknown & (() => void)>(true)
	type.false<IsUnknown<unknown & (() => void)>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsUnknown<unknown, 1, 2>, 1>(true)
	type.equal<IsUnknown<number, 1, 2>, 2>(true)

	type.equal<IsUnknown<any, 1, 2>, 2>(true)
	type.equal<IsUnknown<never, 1, 2>, 2>(true)
	type.equal<IsUnknown<void, 1, 2>, 2>(true)
})

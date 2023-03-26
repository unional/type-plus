import { PrimitiveTypes, type, type IsNotUnknown } from '../index.js'

it('returns false for unknown', () => {
	type.false<IsNotUnknown<unknown>>(true)
})

it('returns true for other special types', () => {
	type.true<IsNotUnknown<any>>(true)
	type.true<IsNotUnknown<void>>(true)
	type.true<IsNotUnknown<never>>(true)
})

test('returns true for other types', () => {
	type.true<IsNotUnknown<null>>(true)
	type.true<IsNotUnknown<number>>(true)
	type.true<IsNotUnknown<boolean>>(true)
	type.true<IsNotUnknown<true>>(true)
	type.true<IsNotUnknown<false>>(true)
	type.true<IsNotUnknown<string>>(true)
	type.true<IsNotUnknown<''>>(true)
	type.true<IsNotUnknown<symbol>>(true)
	type.true<IsNotUnknown<bigint>>(true)
	type.true<IsNotUnknown<{}>>(true)
	type.true<IsNotUnknown<string[]>>(true)
	type.true<IsNotUnknown<[]>>(true)
	type.true<IsNotUnknown<Function>>(true)
	type.true<IsNotUnknown<() => void>>(true)
})

it('returns true for union type as unknown | <others> => unknown', () => {
	type.equal<unknown | PrimitiveTypes, unknown>(true)
	type.false<IsNotUnknown<unknown | 1>>(true)
})

it('returns true as unknown & any => any', () => {
	type.equal<unknown & any, any>(true)
	type.true<IsNotUnknown<unknown & any>>(true)
})

it('returns false as unknown & void => void', () => {
	type.equal<unknown & void, void>(true)
	type.true<IsNotUnknown<unknown & void>>(true)
})

it('returns true as unknown & never => never', () => {
	type.equal<unknown & never, never>(true)
	type.true<IsNotUnknown<unknown & never>>(true)
})

it('returns true as unknown & <others> => <others>', () => {
	type.equal<unknown & null, null>(true)
	type.true<IsNotUnknown<unknown & null>>(true)
	type.equal<unknown & number, number>(true)
	type.true<IsNotUnknown<unknown & number>>(true)
	type.equal<unknown & 1, 1>(true)
	type.true<IsNotUnknown<unknown & 1>>(true)
	type.equal<unknown & boolean, boolean>(true)
	type.true<IsNotUnknown<unknown & boolean>>(true)
	type.equal<unknown & true, true>(true)
	type.true<IsNotUnknown<unknown & true>>(true)
	type.equal<unknown & false, false>(true)
	type.true<IsNotUnknown<unknown & false>>(true)
	type.equal<unknown & string, string>(true)
	type.true<IsNotUnknown<unknown & string>>(true)
	type.equal<unknown & '', ''>(true)
	type.true<IsNotUnknown<unknown & ''>>(true)
	type.equal<unknown & symbol, symbol>(true)
	type.true<IsNotUnknown<unknown & symbol>>(true)
	type.equal<unknown & bigint, bigint>(true)
	type.true<IsNotUnknown<unknown & bigint>>(true)
	type.equal<unknown & 1n, 1n>(true)
	type.true<IsNotUnknown<unknown & 1n>>(true)
	type.equal<unknown & {}, unknown & {}>(true)
	type.true<IsNotUnknown<unknown & {}>>(true)
	type.equal<unknown & { a: 1 }, unknown & { a: 1 }>(true)
	type.true<IsNotUnknown<unknown & { a: 1 }>>(true)
	type.equal<unknown & string[], unknown & string[]>(true)
	type.true<IsNotUnknown<unknown & string[]>>(true)
	type.equal<unknown & [], unknown & []>(true)
	type.true<IsNotUnknown<unknown & []>>(true)
	type.equal<unknown & Function, unknown & Function>(true)
	type.true<IsNotUnknown<unknown & Function>>(true)
	type.equal<unknown & (() => void), unknown & (() => void)>(true)
	type.true<IsNotUnknown<unknown & (() => void)>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotUnknown<unknown, 1, 2>, 2>(true)
	type.equal<IsNotUnknown<number, 1, 2>, 1>(true)

	type.equal<IsNotUnknown<any, 1, 2>, 1>(true)
	type.equal<IsNotUnknown<never, 1, 2>, 1>(true)
	type.equal<IsNotUnknown<void, 1, 2>, 1>(true)
})

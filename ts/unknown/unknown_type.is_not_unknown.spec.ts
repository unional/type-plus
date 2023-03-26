import { type, type IsNotUnknown } from '../index.js'

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
	type.false<IsNotUnknown<unknown | 1>>(true)
})

it('returns true as unknown & any => any', () => {
	type.true<IsNotUnknown<unknown & any>>(true)
})

it('returns false as unknown & void => void', () => {
	type.true<IsNotUnknown<unknown & void>>(true)
})

it('returns true as unknown & never => never', () => {
	type.true<IsNotUnknown<unknown & never>>(true)
})

it('returns true as unknown & <others> => <others>', () => {
	type.true<IsNotUnknown<unknown & null>>(true)
	type.true<IsNotUnknown<unknown & number>>(true)
	type.true<IsNotUnknown<unknown & 1>>(true)
	type.true<IsNotUnknown<unknown & boolean>>(true)
	type.true<IsNotUnknown<unknown & true>>(true)
	type.true<IsNotUnknown<unknown & false>>(true)
	type.true<IsNotUnknown<unknown & string>>(true)
	type.true<IsNotUnknown<unknown & ''>>(true)
	type.true<IsNotUnknown<unknown & symbol>>(true)
	type.true<IsNotUnknown<unknown & bigint>>(true)
	type.true<IsNotUnknown<unknown & 1n>>(true)
	type.true<IsNotUnknown<unknown & {}>>(true)
	type.true<IsNotUnknown<unknown & { a: 1 }>>(true)
	type.true<IsNotUnknown<unknown & string[]>>(true)
	type.true<IsNotUnknown<unknown & []>>(true)
	type.true<IsNotUnknown<unknown & Function>>(true)
	type.true<IsNotUnknown<unknown & (() => void)>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotUnknown<unknown, 1, 2>, 2>(true)
	type.equal<IsNotUnknown<number, 1, 2>, 1>(true)

	type.equal<IsNotUnknown<any, 1, 2>, 1>(true)
	type.equal<IsNotUnknown<never, 1, 2>, 1>(true)
	type.equal<IsNotUnknown<void, 1, 2>, 1>(true)
})

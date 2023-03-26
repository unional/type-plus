import { type, type IsUndefined } from '../index.js'

it('returns true for undefined', () => {
	type.true<IsUndefined<undefined>>(true)
})

it('returns false for special types', () => {
	type.false<IsUndefined<any>>(true)
	type.false<IsUndefined<unknown>>(true)
	type.false<IsUndefined<void>>(true)
	type.false<IsUndefined<never>>(true)
})

test('returns false for singular types', () => {
	type.false<IsUndefined<null>>(true)
	type.false<IsUndefined<number>>(true)
	type.false<IsUndefined<boolean>>(true)
	type.false<IsUndefined<true>>(true)
	type.false<IsUndefined<false>>(true)
	type.false<IsUndefined<string>>(true)
	type.false<IsUndefined<''>>(true)
	type.false<IsUndefined<symbol>>(true)
	type.false<IsUndefined<bigint>>(true)
	type.false<IsUndefined<{}>>(true)
	type.false<IsUndefined<string[]>>(true)
	type.false<IsUndefined<[]>>(true)
	type.false<IsUndefined<Function>>(true)
	type.false<IsUndefined<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsUndefined<undefined | 1>>(true)
})

it('returns false as undefined & any => any', () => {
	type.false<IsUndefined<undefined & any>>(true)
})

it('returns true as undefined & unknown => undefined', () => {
	type.true<IsUndefined<undefined & unknown>>(true)
})

it('returns true as undefined & void => undefined', () => {
	type.true<IsUndefined<undefined & void>>(true)
})

it('returns false as undefined & never => never', () => {
	type.false<IsUndefined<undefined & never>>(true)
})

it('returns false as undefined & <others> => never', () => {
	type.false<IsUndefined<undefined & null>>(true)
	type.false<IsUndefined<undefined & number>>(true)
	type.false<IsUndefined<undefined & 1>>(true)
	type.false<IsUndefined<undefined & boolean>>(true)
	type.false<IsUndefined<undefined & true>>(true)
	type.false<IsUndefined<undefined & false>>(true)
	type.false<IsUndefined<undefined & string>>(true)
	type.false<IsUndefined<undefined & ''>>(true)
	type.false<IsUndefined<undefined & symbol>>(true)
	type.false<IsUndefined<undefined & bigint>>(true)
	type.false<IsUndefined<undefined & 1n>>(true)
	type.false<IsUndefined<undefined & {}>>(true)
	type.false<IsUndefined<undefined & { a: 1 }>>(true)
	type.false<IsUndefined<undefined & string[]>>(true)
	type.false<IsUndefined<undefined & []>>(true)
	type.false<IsUndefined<undefined & Function>>(true)
	type.false<IsUndefined<undefined & (() => void)>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsUndefined<undefined, 1, 2>, 1>(true)
	type.equal<IsUndefined<any, 1, 2>, 2>(true)
	type.equal<IsUndefined<unknown, 1, 2>, 2>(true)
	type.equal<IsUndefined<never, 1, 2>, 2>(true)
	type.equal<IsUndefined<void, 1, 2>, 2>(true)
})

import { type, type IsUndefined, type PrimitiveTypes } from '../index.js'

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
	type.false<IsUndefined<PrimitiveTypes>>(true)
})

it('returns false for intersection type', () => {
	type.false<IsUndefined<{} & {}>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsUndefined<undefined, 1, 2>, 1>(true)
	type.equal<IsUndefined<any, 1, 2>, 2>(true)
	type.equal<IsUndefined<unknown, 1, 2>, 2>(true)
	type.equal<IsUndefined<never, 1, 2>, 2>(true)
	type.equal<IsUndefined<void, 1, 2>, 2>(true)
})

import { PrimitiveTypes, type, type IsNotUndefined } from '../index.js'

it('returns false for undefined', () => {
	type.false<IsNotUndefined<undefined>>(true)
})

it('returns true for other special types', () => {
	type.true<IsNotUndefined<any>>(true)
	type.true<IsNotUndefined<unknown>>(true)
	type.true<IsNotUndefined<void>>(true)
	type.true<IsNotUndefined<never>>(true)
})

test('returns true for singular types', () => {
	type.true<IsNotUndefined<null>>(true)
	type.true<IsNotUndefined<number>>(true)
	type.true<IsNotUndefined<boolean>>(true)
	type.true<IsNotUndefined<true>>(true)
	type.true<IsNotUndefined<false>>(true)
	type.true<IsNotUndefined<string>>(true)
	type.true<IsNotUndefined<''>>(true)
	type.true<IsNotUndefined<symbol>>(true)
	type.true<IsNotUndefined<bigint>>(true)
	type.true<IsNotUndefined<{}>>(true)
	type.true<IsNotUndefined<string[]>>(true)
	type.true<IsNotUndefined<[]>>(true)
	type.true<IsNotUndefined<Function>>(true)
	type.true<IsNotUndefined<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotUndefined<PrimitiveTypes>>(true)
})

it('returns true for intersection type', () => {
	type.true<IsNotUndefined<{} & {}>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotUndefined<undefined, 1, 2>, 2>(true)

	type.equal<IsNotUndefined<any, 1, 2>, 1>(true)
	type.equal<IsNotUndefined<unknown, 1, 2>, 1>(true)
	type.equal<IsNotUndefined<never, 1, 2>, 1>(true)
	type.equal<IsNotUndefined<void, 1, 2>, 1>(true)
})

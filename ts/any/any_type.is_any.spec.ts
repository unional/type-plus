import { type, type IsAny, type PrimitiveTypes } from '../index.js'

it('returns true for any', () => {
	type.true<IsAny<any>>(true)
})

it('returns false for other special types', () => {
	type.false<IsAny<unknown>>(true)
	type.false<IsAny<void>>(true)
	type.false<IsAny<never>>(true)
})

test('returns false for singular types', () => {
	type.false<IsAny<undefined>>(true)
	type.false<IsAny<null>>(true)
	type.false<IsAny<number>>(true)
	type.false<IsAny<boolean>>(true)
	type.false<IsAny<true>>(true)
	type.false<IsAny<false>>(true)
	type.false<IsAny<string>>(true)
	type.false<IsAny<''>>(true)
	type.false<IsAny<symbol>>(true)
	type.false<IsAny<bigint>>(true)
	type.false<IsAny<{}>>(true)
	type.false<IsAny<string[]>>(true)
	type.false<IsAny<[]>>(true)
	type.false<IsAny<Function>>(true)
	type.false<IsAny<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsAny<PrimitiveTypes>>(true)
})

it('returns false for intersection type', () => {
	type.false<IsAny<{} & {}>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsAny<any, 1, 2>, 1>(true)
	type.equal<IsAny<unknown, 1, 2>, 2>(true)
	type.equal<IsAny<never, 1, 2>, 2>(true)
	type.equal<IsAny<void, 1, 2>, 2>(true)
})

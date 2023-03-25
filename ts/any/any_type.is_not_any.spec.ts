import { type, type IsNotAny, type PrimitiveTypes } from '../index.js'

it('returns false for any', () => {
	type.false<IsNotAny<any>>(true)
})

it('returns true for other special types', () => {
	type.true<IsNotAny<unknown>>(true)
	type.true<IsNotAny<void>>(true)
	type.true<IsNotAny<never>>(true)
})

test('returns true for singular types', () => {
	type.true<IsNotAny<undefined>>(true)
	type.true<IsNotAny<null>>(true)
	type.true<IsNotAny<number>>(true)
	type.true<IsNotAny<boolean>>(true)
	type.true<IsNotAny<true>>(true)
	type.true<IsNotAny<false>>(true)
	type.true<IsNotAny<string>>(true)
	type.true<IsNotAny<''>>(true)
	type.true<IsNotAny<symbol>>(true)
	type.true<IsNotAny<bigint>>(true)
	type.true<IsNotAny<{}>>(true)
	type.true<IsNotAny<string[]>>(true)
	type.true<IsNotAny<[]>>(true)
	type.true<IsNotAny<Function>>(true)
	type.true<IsNotAny<() => void>>(true)
})

it('returns never for union type', () => {
	type.true<IsNotAny<PrimitiveTypes>>(true)
})

it('returns never for intersection type', () => {
	type.true<IsNotAny<{} & {}>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotAny<any, 1, 2>, 2>(true)
	type.equal<IsNotAny<unknown, 1, 2>, 1>(true)
	type.equal<IsNotAny<never, 1, 2>, 1>(true)
	type.equal<IsNotAny<void, 1, 2>, 1>(true)
})

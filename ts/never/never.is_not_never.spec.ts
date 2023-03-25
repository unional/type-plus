import { type, type IsNotNever, type PrimitiveTypes } from '../index.js'

it('returns false for never', () => {
	type.false<IsNotNever<never>>(true)
})

it('returns true for other special types', () => {
	type.true<IsNotNever<unknown>>(true)
	type.true<IsNotNever<void>>(true)
	type.true<IsNotNever<any>>(true)
})

test('returns true for singular types', () => {
	type.true<IsNotNever<undefined>>(true)
	type.true<IsNotNever<null>>(true)
	type.true<IsNotNever<number>>(true)
	type.true<IsNotNever<boolean>>(true)
	type.true<IsNotNever<true>>(true)
	type.true<IsNotNever<false>>(true)
	type.true<IsNotNever<string>>(true)
	type.true<IsNotNever<''>>(true)
	type.true<IsNotNever<symbol>>(true)
	type.true<IsNotNever<bigint>>(true)
	type.true<IsNotNever<{}>>(true)
	type.true<IsNotNever<string[]>>(true)
	type.true<IsNotNever<[]>>(true)
	type.true<IsNotNever<Function>>(true)
	type.true<IsNotNever<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotNever<PrimitiveTypes>>(true)
})

it('returns true for intersection type', () => {
	type.true<IsNotNever<{} & {}>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotNever<any, 1, 2>, 1>(true)
	type.equal<IsNotNever<unknown, 1, 2>, 1>(true)
	type.equal<IsNotNever<never, 1, 2>, 2>(true)
	type.equal<IsNotNever<void, 1, 2>, 1>(true)
})

import { type, type IsNever, type PrimitiveTypes } from '../index.js'

it('returns true for never', () => {
	type.true<IsNever<never>>(true)
})

it('returns false for other special types', () => {
	type.false<IsNever<unknown>>(true)
	type.false<IsNever<void>>(true)
	type.false<IsNever<any>>(true)
})

test('returns false for singular types', () => {
	type.false<IsNever<undefined>>(true)
	type.false<IsNever<null>>(true)
	type.false<IsNever<number>>(true)
	type.false<IsNever<boolean>>(true)
	type.false<IsNever<true>>(true)
	type.false<IsNever<false>>(true)
	type.false<IsNever<string>>(true)
	type.false<IsNever<''>>(true)
	type.false<IsNever<symbol>>(true)
	type.false<IsNever<bigint>>(true)
	type.false<IsNever<{}>>(true)
	type.false<IsNever<string[]>>(true)
	type.false<IsNever<[]>>(true)
	type.false<IsNever<Function>>(true)
	type.false<IsNever<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsNever<PrimitiveTypes>>(true)
})

it('returns false for intersection type', () => {
	type.false<IsNever<{} & {}>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNever<any, 1, 2>, 2>(true)
	type.equal<IsNever<unknown, 1, 2>, 2>(true)
	type.equal<IsNever<never, 1, 2>, 1>(true)
	type.equal<IsNever<void, 1, 2>, 2>(true)
})

import { type, type IsNotNever } from '../index.js'

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
	type.true<IsNotNever<1>>(true)
	type.true<IsNotNever<boolean>>(true)
	type.true<IsNotNever<true>>(true)
	type.true<IsNotNever<false>>(true)
	type.true<IsNotNever<string>>(true)
	type.true<IsNotNever<''>>(true)
	type.true<IsNotNever<symbol>>(true)
	type.true<IsNotNever<bigint>>(true)
	type.true<IsNotNever<1n>>(true)
	type.true<IsNotNever<{}>>(true)
	type.true<IsNotNever<string[]>>(true)
	type.true<IsNotNever<[]>>(true)
	type.true<IsNotNever<Function>>(true)
	type.true<IsNotNever<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotNever<never | 1>>(true)
})

it('returns false for intersection type', () => {
	type.false<IsNotNever<never & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotNever<never, 1, 2>, 2>(true)
	type.equal<IsNotNever<0, 1, 2>, 1>(true)

	type.equal<IsNotNever<any, 1, 2>, 1>(true)
	type.equal<IsNotNever<unknown, 1, 2>, 1>(true)
	type.equal<IsNotNever<void, 1, 2>, 1>(true)
})

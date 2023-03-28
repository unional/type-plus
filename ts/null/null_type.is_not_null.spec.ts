import { type, type IsNotNull } from '../index.js'

it('returns false for null', () => {
	type.false<IsNotNull<null>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotNull<any>>(true)
	type.true<IsNotNull<unknown>>(true)
	type.true<IsNotNull<void>>(true)
	type.true<IsNotNull<never>>(true)
})

test('returns true for other types', () => {
	type.true<IsNotNull<undefined>>(true)
	type.true<IsNotNull<boolean>>(true)
	type.true<IsNotNull<true>>(true)
	type.true<IsNotNull<false>>(true)
	type.true<IsNotNull<number>>(true)
	type.true<IsNotNull<1>>(true)
	type.true<IsNotNull<string>>(true)
	type.true<IsNotNull<''>>(true)
	type.true<IsNotNull<symbol>>(true)
	type.true<IsNotNull<bigint>>(true)
	type.true<IsNotNull<{}>>(true)
	type.true<IsNotNull<string[]>>(true)
	type.true<IsNotNull<[]>>(true)
	type.true<IsNotNull<Function>>(true)
	type.true<IsNotNull<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotNull<null | 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotNull<null, 1, 2>, 2>(true)

	type.equal<IsNotNull<any, 1, 2>, 1>(true)
	type.equal<IsNotNull<unknown, 1, 2>, 1>(true)
	type.equal<IsNotNull<never, 1, 2>, 1>(true)
	type.equal<IsNotNull<void, 1, 2>, 1>(true)
})

import { type, type IsNotAny } from '../index.js'

it('returns false for any', () => {
	type.false<IsNotAny<any>>(true)
})

it('returns true for other special types', () => {
	type.true<IsNotAny<unknown>>(true)
	type.true<IsNotAny<void>>(true)
	type.true<IsNotAny<never>>(true)
})

test('returns true for other types', () => {
	type.true<IsNotAny<undefined>>(true)
	type.true<IsNotAny<null>>(true)
	type.true<IsNotAny<boolean>>(true)
	type.true<IsNotAny<true>>(true)
	type.true<IsNotAny<false>>(true)
	type.true<IsNotAny<number>>(true)
	type.true<IsNotAny<1>>(true)
	type.true<IsNotAny<string>>(true)
	type.true<IsNotAny<''>>(true)
	type.true<IsNotAny<symbol>>(true)
	type.true<IsNotAny<bigint>>(true)
	type.true<IsNotAny<1n>>(true)
	type.true<IsNotAny<{}>>(true)
	type.true<IsNotAny<string[]>>(true)
	type.true<IsNotAny<[]>>(true)
	type.true<IsNotAny<Function>>(true)
	type.true<IsNotAny<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsNotAny<any | 1>>(true)
})

it('returns false for intersection type', () => {
	type.false<IsNotAny<any & 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotAny<any, 1, 2>, 2>(true)
	type.equal<IsNotAny<0, 1, 2>, 1>(true)

	type.equal<IsNotAny<unknown, 1, 2>, 1>(true)
	type.equal<IsNotAny<never, 1, 2>, 1>(true)
	type.equal<IsNotAny<void, 1, 2>, 1>(true)
})

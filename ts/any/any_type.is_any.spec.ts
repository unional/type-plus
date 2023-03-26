import { type, type IsAny } from '../index.js'

it('returns true for any', () => {
	type.true<IsAny<any>>(true)
})

it('returns false for other special types', () => {
	type.false<IsAny<unknown>>(true)
	type.false<IsAny<void>>(true)
	type.false<IsAny<never>>(true)
})

test('returns false for other types', () => {
	type.false<IsAny<undefined>>(true)
	type.false<IsAny<null>>(true)
	type.false<IsAny<boolean>>(true)
	type.false<IsAny<true>>(true)
	type.false<IsAny<false>>(true)
	type.false<IsAny<number>>(true)
	type.false<IsAny<1>>(true)
	type.false<IsAny<string>>(true)
	type.false<IsAny<''>>(true)
	type.false<IsAny<symbol>>(true)
	type.false<IsAny<bigint>>(true)
	type.false<IsAny<1n>>(true)
	type.false<IsAny<{}>>(true)
	type.false<IsAny<{ a: 1 }>>(true)
	type.false<IsAny<string[]>>(true)
	type.false<IsAny<[]>>(true)
	type.false<IsAny<Function>>(true)
	type.false<IsAny<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsAny<any | 1>>(true)
})

it('returns true for intersection type', () => {
	type.true<IsAny<any & 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsAny<any, 1, 2>, 1>(true)
	type.equal<IsAny<0, 1, 2>, 2>(true)

	type.equal<IsAny<unknown, 1, 2>, 2>(true)
	type.equal<IsAny<never, 1, 2>, 2>(true)
	type.equal<IsAny<void, 1, 2>, 2>(true)
})

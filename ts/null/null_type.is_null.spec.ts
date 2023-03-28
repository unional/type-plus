import { type, type IsNull } from '../index.js'

it('returns true for null', () => {
	type.true<IsNull<null>>(true)
})

it('returns false for special types', () => {
	type.false<IsNull<any>>(true)
	type.false<IsNull<unknown>>(true)
	type.false<IsNull<void>>(true)
	type.false<IsNull<never>>(true)
})

test('returns false for other types', () => {
	type.false<IsNull<undefined>>(true)
	type.false<IsNull<boolean>>(true)
	type.false<IsNull<true>>(true)
	type.false<IsNull<false>>(true)
	type.false<IsNull<number>>(true)
	type.false<IsNull<1>>(true)
	type.false<IsNull<string>>(true)
	type.false<IsNull<''>>(true)
	type.false<IsNull<symbol>>(true)
	type.false<IsNull<bigint>>(true)
	type.false<IsNull<{}>>(true)
	type.false<IsNull<string[]>>(true)
	type.false<IsNull<[]>>(true)
	type.false<IsNull<Function>>(true)
	type.false<IsNull<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsNull<null | 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNull<null, 1, 2>, 1>(true)

	type.equal<IsNull<any, 1, 2>, 2>(true)
	type.equal<IsNull<unknown, 1, 2>, 2>(true)
	type.equal<IsNull<never, 1, 2>, 2>(true)
	type.equal<IsNull<void, 1, 2>, 2>(true)
})

import { type, type IsVoid } from '../index.js'

it('returns true for void', () => {
	type.true<IsVoid<void>>(true)
})

it('returns false for other special types', () => {
	type.false<IsVoid<any>>(true)
	type.false<IsVoid<unknown>>(true)
	type.false<IsVoid<never>>(true)
})

test('returns false for singular types', () => {
	type.false<IsVoid<undefined>>(true)
	type.false<IsVoid<null>>(true)
	type.false<IsVoid<number>>(true)
	type.false<IsVoid<1>>(true)
	type.false<IsVoid<boolean>>(true)
	type.false<IsVoid<true>>(true)
	type.false<IsVoid<false>>(true)
	type.false<IsVoid<string>>(true)
	type.false<IsVoid<''>>(true)
	type.false<IsVoid<symbol>>(true)
	type.false<IsVoid<bigint>>(true)
	type.false<IsVoid<1n>>(true)
	type.false<IsVoid<{}>>(true)
	type.false<IsVoid<string[]>>(true)
	type.false<IsVoid<[]>>(true)
	type.false<IsVoid<Function>>(true)
	type.false<IsVoid<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsVoid<void | 1>>(true)
})

it('returns true for intersection type', () => {
	type.true<IsVoid<void & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsVoid<void, 1, 2>, 1>(true)
	type.equal<IsVoid<0, 1, 2>, 2>(true)

	type.equal<IsVoid<any, 1, 2>, 2>(true)
	type.equal<IsVoid<unknown, 1, 2>, 2>(true)
	type.equal<IsVoid<never, 1, 2>, 2>(true)
})

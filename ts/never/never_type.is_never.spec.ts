// never intersect with any type is never
import { type, type IsNever } from '../index.js'

it('returns true for never', () => {
	type.true<IsNever<never>>(true)
})

it('returns false for other special types', () => {
	type.false<IsNever<unknown>>(true)
	type.false<IsNever<void>>(true)
	type.false<IsNever<any>>(true)
})

test('returns false for other types', () => {
	type.false<IsNever<undefined>>(true)
	type.false<IsNever<null>>(true)
	type.false<IsNever<number>>(true)
	type.false<IsNever<1>>(true)
	type.false<IsNever<boolean>>(true)
	type.false<IsNever<true>>(true)
	type.false<IsNever<false>>(true)
	type.false<IsNever<string>>(true)
	type.false<IsNever<''>>(true)
	type.false<IsNever<symbol>>(true)
	type.false<IsNever<bigint>>(true)
	type.false<IsNever<1n>>(true)
	type.false<IsNever<{}>>(true)
	type.false<IsNever<string[]>>(true)
	type.false<IsNever<[]>>(true)
	type.false<IsNever<Function>>(true)
	type.false<IsNever<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsNever<never | 1>>(true)
})

it('returns true for intersection type', () => {
	// never intersect with any type is never
	type.true<IsNever<never & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNever<never, 1, 2>, 1>(true)
	type.equal<IsNever<0, 1, 2>, 2>(true)

	type.equal<IsNever<any, 1, 2>, 2>(true)
	type.equal<IsNever<unknown, 1, 2>, 2>(true)
	type.equal<IsNever<void, 1, 2>, 2>(true)
})

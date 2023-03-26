import { type, type IsNotVoid } from '../index.js'

it('returns false for void', () => {
	type.false<IsNotVoid<void>>(true)
})

it('returns true for other special types', () => {
	type.true<IsNotVoid<any>>(true)
	type.true<IsNotVoid<unknown>>(true)
	type.true<IsNotVoid<never>>(true)
})

test('returns true for other types', () => {
	type.true<IsNotVoid<undefined>>(true)
	type.true<IsNotVoid<null>>(true)
	type.true<IsNotVoid<number>>(true)
	type.true<IsNotVoid<boolean>>(true)
	type.true<IsNotVoid<true>>(true)
	type.true<IsNotVoid<false>>(true)
	type.true<IsNotVoid<string>>(true)
	type.true<IsNotVoid<''>>(true)
	type.true<IsNotVoid<symbol>>(true)
	type.true<IsNotVoid<bigint>>(true)
	type.true<IsNotVoid<{}>>(true)
	type.true<IsNotVoid<string[]>>(true)
	type.true<IsNotVoid<[]>>(true)
	type.true<IsNotVoid<Function>>(true)
	type.true<IsNotVoid<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotVoid<void | 1>>(true)
})

it('returns false for intersection type', () => {
	type.false<IsNotVoid<void & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotVoid<void, 1, 2>, 2>(true)
	type.equal<IsNotVoid<0, 1, 2>, 1>(true)

	type.equal<IsNotVoid<any, 1, 2>, 1>(true)
	type.equal<IsNotVoid<unknown, 1, 2>, 1>(true)
	type.equal<IsNotVoid<never, 1, 2>, 1>(true)
})

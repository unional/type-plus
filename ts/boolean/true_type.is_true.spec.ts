import { type, type IsTrue } from '../index.js'

it('returns true if T is true', () => {
	type.true<IsTrue<true>>(true)
})

it('returns false if T is boolean or false', () => {
	type.false<IsTrue<boolean>>(true)
	type.false<IsTrue<false>>(true)
})

it('returns false for special types', () => {
	type.false<IsTrue<void>>(true)
	type.false<IsTrue<unknown>>(true)
	type.false<IsTrue<any>>(true)
	type.false<IsTrue<never>>(true)
})

it('returns false for other types', () => {
	type.false<IsTrue<undefined>>(true)
	type.false<IsTrue<null>>(true)
	type.false<IsTrue<number>>(true)
	type.false<IsTrue<1>>(true)
	type.false<IsTrue<boolean>>(true)
	type.false<IsTrue<false>>(true)
	type.false<IsTrue<string>>(true)
	type.false<IsTrue<''>>(true)
	type.false<IsTrue<symbol>>(true)
	type.false<IsTrue<bigint>>(true)
	type.false<IsTrue<1n>>(true)
	type.false<IsTrue<{}>>(true)
	type.false<IsTrue<{ a: 1 }>>(true)
	type.false<IsTrue<string[]>>(true)
	type.false<IsTrue<[]>>(true)
	type.false<IsTrue<Function>>(true)
	type.false<IsTrue<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsTrue<true | 1>>(true)
	type.false<IsTrue<true | boolean>>(true)
})

it('returns false for intersection type', () => {
	type.false<IsTrue<true & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsTrue<true, 1, 2>, 1>(true)
	type.equal<IsTrue<0, 1, 2>, 2>(true)

	type.equal<IsTrue<any, 1, 2>, 2>(true)
	type.equal<IsTrue<unknown, 1, 2>, 2>(true)
	type.equal<IsTrue<never, 1, 2>, 2>(true)
	type.equal<IsTrue<void, 1, 2>, 2>(true)
})

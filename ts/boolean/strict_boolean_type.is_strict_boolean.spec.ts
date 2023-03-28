import { type, type IsStrictBoolean } from '../index.js'

it('returns true if T is boolean', () => {
	type.true<IsStrictBoolean<boolean>>(true)
})

it('returns false it T is true or false literal', () => {
	type.false<IsStrictBoolean<true>>(true)
	type.false<IsStrictBoolean<false>>(true)
})

it('returns false for special types', () => {
	type.false<IsStrictBoolean<void>>(true)
	type.false<IsStrictBoolean<unknown>>(true)
	type.false<IsStrictBoolean<any>>(true)
	type.false<IsStrictBoolean<never>>(true)
})

it('returns false for other types', () => {
	type.false<IsStrictBoolean<undefined>>(true)
	type.false<IsStrictBoolean<null>>(true)
	type.false<IsStrictBoolean<number>>(true)
	type.false<IsStrictBoolean<1>>(true)
	type.false<IsStrictBoolean<string>>(true)
	type.false<IsStrictBoolean<''>>(true)
	type.false<IsStrictBoolean<symbol>>(true)
	type.false<IsStrictBoolean<bigint>>(true)
	type.false<IsStrictBoolean<1n>>(true)
	type.false<IsStrictBoolean<{}>>(true)
	type.false<IsStrictBoolean<{ a: 1 }>>(true)
	type.false<IsStrictBoolean<string[]>>(true)
	type.false<IsStrictBoolean<[]>>(true)
	type.false<IsStrictBoolean<Function>>(true)
	type.false<IsStrictBoolean<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsStrictBoolean<boolean | 1>>(true)
})

it('returns false for intersection type', () => {
	type.false<IsStrictBoolean<boolean & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsStrictBoolean<boolean, 1, 2>, 1>(true)
	type.equal<IsStrictBoolean<true, 1, 2>, 2>(true)
	type.equal<IsStrictBoolean<false, 1, 2>, 2>(true)

	type.equal<IsStrictBoolean<any, 1, 2>, 2>(true)
	type.equal<IsStrictBoolean<unknown, 1, 2>, 2>(true)
	type.equal<IsStrictBoolean<never, 1, 2>, 2>(true)
	type.equal<IsStrictBoolean<void, 1, 2>, 2>(true)
})

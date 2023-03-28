import { type, type IsBoolean } from '../index.js'

it('returns true if T is boolean', () => {
	type.true<IsBoolean<boolean>>(true)
})

it('returns true it T is true or false literal', () => {
	type.true<IsBoolean<true>>(true)
	type.true<IsBoolean<false>>(true)
})

it('returns false for special types', () => {
	type.false<IsBoolean<void>>(true)
	type.false<IsBoolean<unknown>>(true)
	type.false<IsBoolean<any>>(true)
	type.false<IsBoolean<never>>(true)
})

it('returns false for other types', () => {
	type.false<IsBoolean<undefined>>(true)
	type.false<IsBoolean<null>>(true)
	type.false<IsBoolean<number>>(true)
	type.false<IsBoolean<1>>(true)
	type.false<IsBoolean<string>>(true)
	type.false<IsBoolean<''>>(true)
	type.false<IsBoolean<symbol>>(true)
	type.false<IsBoolean<bigint>>(true)
	type.false<IsBoolean<1n>>(true)
	type.false<IsBoolean<{}>>(true)
	type.false<IsBoolean<{ a: 1 }>>(true)
	type.false<IsBoolean<string[]>>(true)
	type.false<IsBoolean<[]>>(true)
	type.false<IsBoolean<Function>>(true)
	type.false<IsBoolean<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsBoolean<boolean | 1>>(true)
})

it('returns true for intersection type', () => {
	type.true<IsBoolean<boolean & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsBoolean<boolean, 1, 2>, 1>(true)
	type.equal<IsBoolean<true, 1, 2>, 1>(true)
	type.equal<IsBoolean<false, 1, 2>, 1>(true)

	type.equal<IsBoolean<any, 1, 2>, 2>(true)
	type.equal<IsBoolean<unknown, 1, 2>, 2>(true)
	type.equal<IsBoolean<never, 1, 2>, 2>(true)
	type.equal<IsBoolean<void, 1, 2>, 2>(true)
})

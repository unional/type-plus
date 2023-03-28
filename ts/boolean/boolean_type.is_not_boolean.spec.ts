import { type, type IsNotBoolean } from '../index.js'

it('returns false if T is boolean', () => {
	type.false<IsNotBoolean<boolean>>(true)
})

it('returns false it T is true or false literal', () => {
	type.false<IsNotBoolean<true>>(true)
	type.false<IsNotBoolean<false>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotBoolean<void>>(true)
	type.true<IsNotBoolean<unknown>>(true)
	type.true<IsNotBoolean<any>>(true)
	type.true<IsNotBoolean<never>>(true)
})

it('returns true for all other types', () => {
	type.true<IsNotBoolean<undefined>>(true)
	type.true<IsNotBoolean<null>>(true)
	type.true<IsNotBoolean<number>>(true)
	type.true<IsNotBoolean<1>>(true)
	type.true<IsNotBoolean<string>>(true)
	type.true<IsNotBoolean<''>>(true)
	type.true<IsNotBoolean<symbol>>(true)
	type.true<IsNotBoolean<bigint>>(true)
	type.true<IsNotBoolean<{}>>(true)
	type.true<IsNotBoolean<string[]>>(true)
	type.true<IsNotBoolean<[]>>(true)
	type.true<IsNotBoolean<Function>>(true)
	type.true<IsNotBoolean<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotBoolean<boolean | 1>>(true)
})

it('returns false for intersection type', () => {
	type.false<IsNotBoolean<boolean & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotBoolean<boolean, 1, 2>, 2>(true)
	type.equal<IsNotBoolean<true, 1, 2>, 2>(true)
	type.equal<IsNotBoolean<false, 1, 2>, 2>(true)

	type.equal<IsNotBoolean<any, 1, 2>, 1>(true)
	type.equal<IsNotBoolean<unknown, 1, 2>, 1>(true)
	type.equal<IsNotBoolean<never, 1, 2>, 1>(true)
	type.equal<IsNotBoolean<void, 1, 2>, 1>(true)
})

import { type, type IsNotStrictBoolean } from '../index.js'

it('returns false if T is boolean', () => {
	type.false<IsNotStrictBoolean<boolean>>(true)
})

it('returns true it T is true or false literal', () => {
	type.true<IsNotStrictBoolean<true>>(true)
	type.true<IsNotStrictBoolean<false>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotStrictBoolean<void>>(true)
	type.true<IsNotStrictBoolean<unknown>>(true)
	type.true<IsNotStrictBoolean<any>>(true)
	type.true<IsNotStrictBoolean<never>>(true)
})

it('returns true for all other types', () => {
	type.true<IsNotStrictBoolean<undefined>>(true)
	type.true<IsNotStrictBoolean<null>>(true)
	type.true<IsNotStrictBoolean<number>>(true)
	type.true<IsNotStrictBoolean<1>>(true)
	type.true<IsNotStrictBoolean<string>>(true)
	type.true<IsNotStrictBoolean<''>>(true)
	type.true<IsNotStrictBoolean<symbol>>(true)
	type.true<IsNotStrictBoolean<bigint>>(true)
	type.true<IsNotStrictBoolean<1n>>(true)
	type.true<IsNotStrictBoolean<{}>>(true)
	type.true<IsNotStrictBoolean<{ a: 1 }>>(true)
	type.true<IsNotStrictBoolean<string[]>>(true)
	type.true<IsNotStrictBoolean<[]>>(true)
	type.true<IsNotStrictBoolean<Function>>(true)
	type.true<IsNotStrictBoolean<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotStrictBoolean<boolean | 1>>(true)
})

it('returns true for intersection type', () => {
	type.true<IsNotStrictBoolean<boolean & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotStrictBoolean<boolean, 1, 2>, 2>(true)
	type.equal<IsNotStrictBoolean<true, 1, 2>, 1>(true)
	type.equal<IsNotStrictBoolean<false, 1, 2>, 1>(true)

	type.equal<IsNotStrictBoolean<any, 1, 2>, 1>(true)
	type.equal<IsNotStrictBoolean<unknown, 1, 2>, 1>(true)
	type.equal<IsNotStrictBoolean<never, 1, 2>, 1>(true)
	type.equal<IsNotStrictBoolean<void, 1, 2>, 1>(true)
})

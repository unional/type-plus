import { type, type IsBoolean, type PrimitiveTypes } from '../index.js'

it('returns true if T is boolean', () => {
	type.true<IsBoolean<boolean>>(true)
})

it('returns false it T is true or false literal', () => {
	type.false<IsBoolean<true>>(true)
	type.false<IsBoolean<false>>(true)
})

it('returns false for special types', () => {
	type.false<IsBoolean<void>>(true)
	type.false<IsBoolean<unknown>>(true)
	type.false<IsBoolean<any>>(true)
	type.false<IsBoolean<never>>(true)
})

it('returns false for all other types', () => {
	type.false<IsBoolean<undefined>>(true)
	type.false<IsBoolean<null>>(true)
	type.false<IsBoolean<number>>(true)
	type.false<IsBoolean<1>>(true)
	type.false<IsBoolean<true>>(true)
	type.false<IsBoolean<false>>(true)
	type.false<IsBoolean<string>>(true)
	type.false<IsBoolean<''>>(true)
	type.false<IsBoolean<symbol>>(true)
	type.false<IsBoolean<bigint>>(true)
	type.false<IsBoolean<{}>>(true)
	type.false<IsBoolean<string[]>>(true)
	type.false<IsBoolean<[]>>(true)
	type.false<IsBoolean<Function>>(true)
	type.false<IsBoolean<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsBoolean<PrimitiveTypes>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsBoolean<boolean, 1, 2>, 1>(true)
	type.equal<IsBoolean<true, 1, 2>, 2>(true)
	type.equal<IsBoolean<false, 1, 2>, 2>(true)

	type.equal<IsBoolean<any, 1, 2>, 2>(true)
	type.equal<IsBoolean<unknown, 1, 2>, 2>(true)
	type.equal<IsBoolean<never, 1, 2>, 2>(true)
	type.equal<IsBoolean<void, 1, 2>, 2>(true)
})

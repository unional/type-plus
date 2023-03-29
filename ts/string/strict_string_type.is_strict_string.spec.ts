import { type, type IsStrictString } from '../index.js'

it('returns true for string', () => {
	type.true<IsStrictString<string>>(true)
})

it('returns false if T is a string literal', () => {
	type.false<IsStrictString<''>>(true)
	type.false<IsStrictString<'a'>>(true)
})

it('returns false for special types', () => {
	type.false<IsStrictString<any>>(true)
	type.false<IsStrictString<unknown>>(true)
	type.false<IsStrictString<void>>(true)
	type.false<IsStrictString<never>>(true)
})

it('returns false for other types', () => {
	type.false<IsStrictString<undefined>>(true)
	type.false<IsStrictString<null>>(true)
	type.false<IsStrictString<boolean>>(true)
	type.false<IsStrictString<true>>(true)
	type.false<IsStrictString<false>>(true)
	type.false<IsStrictString<number>>(true)
	type.false<IsStrictString<1>>(true)
	type.false<IsStrictString<symbol>>(true)
	type.false<IsStrictString<bigint>>(true)
	type.false<IsStrictString<{}>>(true)
	type.false<IsStrictString<string[]>>(true)
	type.false<IsStrictString<[]>>(true)
	type.false<IsStrictString<Function>>(true)
	type.false<IsStrictString<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsStrictString<string | 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsStrictString<string, 1, 2>, 1>(true)
	type.equal<IsStrictString<'', 1, 2>, 2>(true)
	type.equal<IsStrictString<'a', 1, 2>, 2>(true)

	type.equal<IsStrictString<any, 1, 2>, 2>(true)
	type.equal<IsStrictString<unknown, 1, 2>, 2>(true)
	type.equal<IsStrictString<never, 1, 2>, 2>(true)
	type.equal<IsStrictString<void, 1, 2>, 2>(true)
})

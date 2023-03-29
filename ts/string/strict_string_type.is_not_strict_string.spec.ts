import { type, type IsNotStrictString } from '../index.js'

it('returns false for string', () => {
	type.false<IsNotStrictString<string>>(true)
})

it('returns true if T is a string literal', () => {
	type.true<IsNotStrictString<''>>(true)
	type.true<IsNotStrictString<'a'>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotStrictString<any>>(true)
	type.true<IsNotStrictString<unknown>>(true)
	type.true<IsNotStrictString<void>>(true)
	type.true<IsNotStrictString<never>>(true)
})

it('returns true for other types', () => {
	type.true<IsNotStrictString<undefined>>(true)
	type.true<IsNotStrictString<null>>(true)
	type.true<IsNotStrictString<boolean>>(true)
	type.true<IsNotStrictString<true>>(true)
	type.true<IsNotStrictString<false>>(true)
	type.true<IsNotStrictString<number>>(true)
	type.true<IsNotStrictString<1>>(true)
	type.true<IsNotStrictString<symbol>>(true)
	type.true<IsNotStrictString<bigint>>(true)
	type.true<IsNotStrictString<{}>>(true)
	type.true<IsNotStrictString<string[]>>(true)
	type.true<IsNotStrictString<[]>>(true)
	type.true<IsNotStrictString<Function>>(true)
	type.true<IsNotStrictString<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotStrictString<string | 1>>(true)
})

it('returns true for intersection type', () => {
	type.equal<IsNotStrictString<string & { a: 1 }>, true>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotStrictString<string, 1, 2>, 2>(true)
	type.equal<IsNotStrictString<'', 1, 2>, 1>(true)
	type.equal<IsNotStrictString<'a', 1, 2>, 1>(true)

	type.equal<IsNotStrictString<any, 1, 2>, 1>(true)
	type.equal<IsNotStrictString<unknown, 1, 2>, 1>(true)
	type.equal<IsNotStrictString<never, 1, 2>, 1>(true)
	type.equal<IsNotStrictString<void, 1, 2>, 1>(true)
})

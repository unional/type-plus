import { type, type IsNotString } from '../index.js'

it('returns false for string', () => {
	type.false<IsNotString<string>>(true)
})

it('returns false if T is a string literal', () => {
	type.false<IsNotString<''>>(true)
	type.false<IsNotString<'a'>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotString<any>>(true)
	type.true<IsNotString<unknown>>(true)
	type.true<IsNotString<void>>(true)
	type.true<IsNotString<never>>(true)
})

it('returns true for other types', () => {
	type.true<IsNotString<undefined>>(true)
	type.true<IsNotString<null>>(true)
	type.true<IsNotString<boolean>>(true)
	type.true<IsNotString<true>>(true)
	type.true<IsNotString<false>>(true)
	type.true<IsNotString<number>>(true)
	type.true<IsNotString<1>>(true)
	type.true<IsNotString<symbol>>(true)
	type.true<IsNotString<bigint>>(true)
	type.true<IsNotString<{}>>(true)
	type.true<IsNotString<string[]>>(true)
	type.true<IsNotString<[]>>(true)
	type.true<IsNotString<Function>>(true)
	type.true<IsNotString<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotString<string | 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotString<string, 1, 2>, 2>(true)
	type.equal<IsNotString<'', 1, 2>, 2>(true)
	type.equal<IsNotString<'a', 1, 2>, 2>(true)

	type.equal<IsNotString<any, 1, 2>, 1>(true)
	type.equal<IsNotString<unknown, 1, 2>, 1>(true)
	type.equal<IsNotString<never, 1, 2>, 1>(true)
	type.equal<IsNotString<void, 1, 2>, 1>(true)
})

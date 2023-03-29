import { type, type IsString } from '../index.js'

it('returns true for string', () => {
	type.true<IsString<string>>(true)
})

it('returns true if T is a string literal', () => {
	type.true<IsString<''>>(true)
	type.true<IsString<'a'>>(true)
})

it('returns false for special types', () => {
	type.false<IsString<any>>(true)
	type.false<IsString<unknown>>(true)
	type.false<IsString<void>>(true)
	type.false<IsString<never>>(true)
})

test('returns false for other types', () => {
	type.false<IsString<undefined>>(true)
	type.false<IsString<null>>(true)
	type.false<IsString<boolean>>(true)
	type.false<IsString<true>>(true)
	type.false<IsString<false>>(true)
	type.false<IsString<number>>(true)
	type.false<IsString<1>>(true)
	type.false<IsString<symbol>>(true)
	type.false<IsString<bigint>>(true)
	type.false<IsString<{}>>(true)
	type.false<IsString<string[]>>(true)
	type.false<IsString<[]>>(true)
	type.false<IsString<Function>>(true)
	type.false<IsString<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsString<string | 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsString<string, 1, 2>, 1>(true)
	type.equal<IsString<'', 1, 2>, 1>(true)
	type.equal<IsString<'a', 1, 2>, 1>(true)

	type.equal<IsString<any, 1, 2>, 2>(true)
	type.equal<IsString<unknown, 1, 2>, 2>(true)
	type.equal<IsString<never, 1, 2>, 2>(true)
	type.equal<IsString<void, 1, 2>, 2>(true)
})

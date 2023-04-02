import { testType, type IsString } from '../index.js'

it('returns true for string', () => {
	testType.true<IsString<string>>(true)
})

it('returns true if T is a string literal', () => {
	testType.true<IsString<''>>(true)
	testType.true<IsString<'a'>>(true)
})

it('returns false for special types', () => {
	testType.false<IsString<any>>(true)
	testType.false<IsString<unknown>>(true)
	testType.false<IsString<void>>(true)
	testType.false<IsString<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsString<undefined>>(true)
	testType.false<IsString<null>>(true)
	testType.false<IsString<boolean>>(true)
	testType.false<IsString<true>>(true)
	testType.false<IsString<false>>(true)
	testType.false<IsString<number>>(true)
	testType.false<IsString<1>>(true)
	testType.false<IsString<symbol>>(true)
	testType.false<IsString<bigint>>(true)
	testType.false<IsString<{}>>(true)
	testType.false<IsString<string[]>>(true)
	testType.false<IsString<[]>>(true)
	testType.false<IsString<Function>>(true)
	testType.false<IsString<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsString<string | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsString<string & { a: 1 }>, true>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsString<string, 1, 2>, 1>(true)
	testType.equal<IsString<'', 1, 2>, 1>(true)
	testType.equal<IsString<'a', 1, 2>, 1>(true)

	testType.equal<IsString<any, 1, 2>, 2>(true)
	testType.equal<IsString<unknown, 1, 2>, 2>(true)
	testType.equal<IsString<never, 1, 2>, 2>(true)
	testType.equal<IsString<void, 1, 2>, 2>(true)
})

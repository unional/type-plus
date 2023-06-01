import { it } from '@jest/globals'
import { testType, type IsStrictString } from '../index.js'

it('returns true for string', () => {
	testType.true<IsStrictString<string>>(true)
})

it('returns false if T is a string literal', () => {
	testType.false<IsStrictString<''>>(true)
	testType.false<IsStrictString<'a'>>(true)
})

it('returns false for special types', () => {
	testType.false<IsStrictString<any>>(true)
	testType.false<IsStrictString<unknown>>(true)
	testType.false<IsStrictString<void>>(true)
	testType.false<IsStrictString<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsStrictString<undefined>>(true)
	testType.false<IsStrictString<null>>(true)
	testType.false<IsStrictString<boolean>>(true)
	testType.false<IsStrictString<true>>(true)
	testType.false<IsStrictString<false>>(true)
	testType.false<IsStrictString<number>>(true)
	testType.false<IsStrictString<1>>(true)
	testType.false<IsStrictString<symbol>>(true)
	testType.false<IsStrictString<bigint>>(true)
	testType.false<IsStrictString<{}>>(true)
	testType.false<IsStrictString<string[]>>(true)
	testType.false<IsStrictString<[]>>(true)
	testType.false<IsStrictString<Function>>(true)
	testType.false<IsStrictString<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsStrictString<string | 1>>(true)
})

it('returns false for intersection type', () => {
	testType.equal<IsStrictString<string & { a: 1 }>, false>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsStrictString<string, 1, 2>, 1>(true)
	testType.equal<IsStrictString<'', 1, 2>, 2>(true)
	testType.equal<IsStrictString<'a', 1, 2>, 2>(true)

	testType.equal<IsStrictString<any, 1, 2>, 2>(true)
	testType.equal<IsStrictString<unknown, 1, 2>, 2>(true)
	testType.equal<IsStrictString<never, 1, 2>, 2>(true)
	testType.equal<IsStrictString<void, 1, 2>, 2>(true)
})

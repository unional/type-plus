import { it } from '@jest/globals'
import { testType, type IsNotStrictString } from '../index.js'

it('returns false for string', () => {
	testType.false<IsNotStrictString<string>>(true)
})

it('returns true if T is a string literal', () => {
	testType.true<IsNotStrictString<''>>(true)
	testType.true<IsNotStrictString<'a'>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotStrictString<any>>(true)
	testType.true<IsNotStrictString<unknown>>(true)
	testType.true<IsNotStrictString<void>>(true)
	testType.true<IsNotStrictString<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotStrictString<undefined>>(true)
	testType.true<IsNotStrictString<null>>(true)
	testType.true<IsNotStrictString<boolean>>(true)
	testType.true<IsNotStrictString<true>>(true)
	testType.true<IsNotStrictString<false>>(true)
	testType.true<IsNotStrictString<number>>(true)
	testType.true<IsNotStrictString<1>>(true)
	testType.true<IsNotStrictString<symbol>>(true)
	testType.true<IsNotStrictString<bigint>>(true)
	testType.true<IsNotStrictString<{}>>(true)
	testType.true<IsNotStrictString<string[]>>(true)
	testType.true<IsNotStrictString<[]>>(true)
	testType.true<IsNotStrictString<Function>>(true)
	testType.true<IsNotStrictString<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotStrictString<string | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsNotStrictString<string & { a: 1 }>, true>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotStrictString<string, 1, 2>, 2>(true)
	testType.equal<IsNotStrictString<'', 1, 2>, 1>(true)
	testType.equal<IsNotStrictString<'a', 1, 2>, 1>(true)

	testType.equal<IsNotStrictString<any, 1, 2>, 1>(true)
	testType.equal<IsNotStrictString<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotStrictString<never, 1, 2>, 1>(true)
	testType.equal<IsNotStrictString<void, 1, 2>, 1>(true)
})

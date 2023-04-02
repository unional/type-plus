import { testType, type IsNotString } from '../index.js'

it('returns false for string', () => {
	testType.false<IsNotString<string>>(true)
})

it('returns false if T is a string literal', () => {
	testType.false<IsNotString<''>>(true)
	testType.false<IsNotString<'a'>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotString<any>>(true)
	testType.true<IsNotString<unknown>>(true)
	testType.true<IsNotString<void>>(true)
	testType.true<IsNotString<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotString<undefined>>(true)
	testType.true<IsNotString<null>>(true)
	testType.true<IsNotString<boolean>>(true)
	testType.true<IsNotString<true>>(true)
	testType.true<IsNotString<false>>(true)
	testType.true<IsNotString<number>>(true)
	testType.true<IsNotString<1>>(true)
	testType.true<IsNotString<symbol>>(true)
	testType.true<IsNotString<bigint>>(true)
	testType.true<IsNotString<{}>>(true)
	testType.true<IsNotString<string[]>>(true)
	testType.true<IsNotString<[]>>(true)
	testType.true<IsNotString<Function>>(true)
	testType.true<IsNotString<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotString<string | 1>>(true)
})

it('returns false for intersection type', () => {
	testType.equal<IsNotString<string & { a: 1 }>, false>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotString<string, 1, 2>, 2>(true)
	testType.equal<IsNotString<'', 1, 2>, 2>(true)
	testType.equal<IsNotString<'a', 1, 2>, 2>(true)

	testType.equal<IsNotString<any, 1, 2>, 1>(true)
	testType.equal<IsNotString<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotString<never, 1, 2>, 1>(true)
	testType.equal<IsNotString<void, 1, 2>, 1>(true)
})

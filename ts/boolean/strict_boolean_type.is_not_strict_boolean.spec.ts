import { testType, type IsNotStrictBoolean } from '../index.js'

it('returns false if T is boolean', () => {
	testType.false<IsNotStrictBoolean<boolean>>(true)
})

it('returns true it T is true or false literal', () => {
	testType.true<IsNotStrictBoolean<true>>(true)
	testType.true<IsNotStrictBoolean<false>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotStrictBoolean<void>>(true)
	testType.true<IsNotStrictBoolean<unknown>>(true)
	testType.true<IsNotStrictBoolean<any>>(true)
	testType.true<IsNotStrictBoolean<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotStrictBoolean<undefined>>(true)
	testType.true<IsNotStrictBoolean<null>>(true)
	testType.true<IsNotStrictBoolean<number>>(true)
	testType.true<IsNotStrictBoolean<1>>(true)
	testType.true<IsNotStrictBoolean<string>>(true)
	testType.true<IsNotStrictBoolean<''>>(true)
	testType.true<IsNotStrictBoolean<symbol>>(true)
	testType.true<IsNotStrictBoolean<bigint>>(true)
	testType.true<IsNotStrictBoolean<1n>>(true)
	testType.true<IsNotStrictBoolean<{}>>(true)
	testType.true<IsNotStrictBoolean<{ a: 1 }>>(true)
	testType.true<IsNotStrictBoolean<string[]>>(true)
	testType.true<IsNotStrictBoolean<[]>>(true)
	testType.true<IsNotStrictBoolean<Function>>(true)
	testType.true<IsNotStrictBoolean<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotStrictBoolean<boolean | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsNotStrictBoolean<boolean & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotStrictBoolean<boolean, 1, 2>, 2>(true)
	testType.equal<IsNotStrictBoolean<true, 1, 2>, 1>(true)
	testType.equal<IsNotStrictBoolean<false, 1, 2>, 1>(true)

	testType.equal<IsNotStrictBoolean<any, 1, 2>, 1>(true)
	testType.equal<IsNotStrictBoolean<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotStrictBoolean<never, 1, 2>, 1>(true)
	testType.equal<IsNotStrictBoolean<void, 1, 2>, 1>(true)
})

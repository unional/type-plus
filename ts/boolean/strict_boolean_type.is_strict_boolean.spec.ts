import { testType, type IsStrictBoolean } from '../index.js'

it('returns true if T is boolean', () => {
	testType.true<IsStrictBoolean<boolean>>(true)
})

it('returns false it T is true or false literal', () => {
	testType.false<IsStrictBoolean<true>>(true)
	testType.false<IsStrictBoolean<false>>(true)
})

it('returns false for special types', () => {
	testType.false<IsStrictBoolean<void>>(true)
	testType.false<IsStrictBoolean<unknown>>(true)
	testType.false<IsStrictBoolean<any>>(true)
	testType.false<IsStrictBoolean<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsStrictBoolean<undefined>>(true)
	testType.false<IsStrictBoolean<null>>(true)
	testType.false<IsStrictBoolean<number>>(true)
	testType.false<IsStrictBoolean<1>>(true)
	testType.false<IsStrictBoolean<string>>(true)
	testType.false<IsStrictBoolean<''>>(true)
	testType.false<IsStrictBoolean<symbol>>(true)
	testType.false<IsStrictBoolean<bigint>>(true)
	testType.false<IsStrictBoolean<1n>>(true)
	testType.false<IsStrictBoolean<{}>>(true)
	testType.false<IsStrictBoolean<{ a: 1 }>>(true)
	testType.false<IsStrictBoolean<string[]>>(true)
	testType.false<IsStrictBoolean<[]>>(true)
	testType.false<IsStrictBoolean<Function>>(true)
	testType.false<IsStrictBoolean<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsStrictBoolean<boolean | 1>>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsStrictBoolean<boolean & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsStrictBoolean<boolean, 1, 2>, 1>(true)
	testType.equal<IsStrictBoolean<true, 1, 2>, 2>(true)
	testType.equal<IsStrictBoolean<false, 1, 2>, 2>(true)

	testType.equal<IsStrictBoolean<any, 1, 2>, 2>(true)
	testType.equal<IsStrictBoolean<unknown, 1, 2>, 2>(true)
	testType.equal<IsStrictBoolean<never, 1, 2>, 2>(true)
	testType.equal<IsStrictBoolean<void, 1, 2>, 2>(true)
})

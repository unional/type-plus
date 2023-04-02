import { testType, type IsBoolean } from '../index.js'

it('returns true if T is boolean', () => {
	testType.true<IsBoolean<boolean>>(true)
})

it('returns true it T is true or false literal', () => {
	testType.true<IsBoolean<true>>(true)
	testType.true<IsBoolean<false>>(true)
})

it('returns false for special types', () => {
	testType.false<IsBoolean<void>>(true)
	testType.false<IsBoolean<unknown>>(true)
	testType.false<IsBoolean<any>>(true)
	testType.false<IsBoolean<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsBoolean<undefined>>(true)
	testType.false<IsBoolean<null>>(true)
	testType.false<IsBoolean<number>>(true)
	testType.false<IsBoolean<1>>(true)
	testType.false<IsBoolean<string>>(true)
	testType.false<IsBoolean<''>>(true)
	testType.false<IsBoolean<symbol>>(true)
	testType.false<IsBoolean<bigint>>(true)
	testType.false<IsBoolean<1n>>(true)
	testType.false<IsBoolean<{}>>(true)
	testType.false<IsBoolean<{ a: 1 }>>(true)
	testType.false<IsBoolean<string[]>>(true)
	testType.false<IsBoolean<[]>>(true)
	testType.false<IsBoolean<Function>>(true)
	testType.false<IsBoolean<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsBoolean<boolean | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsBoolean<boolean & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsBoolean<boolean, 1, 2>, 1>(true)
	testType.equal<IsBoolean<true, 1, 2>, 1>(true)
	testType.equal<IsBoolean<false, 1, 2>, 1>(true)

	testType.equal<IsBoolean<any, 1, 2>, 2>(true)
	testType.equal<IsBoolean<unknown, 1, 2>, 2>(true)
	testType.equal<IsBoolean<never, 1, 2>, 2>(true)
	testType.equal<IsBoolean<void, 1, 2>, 2>(true)
})

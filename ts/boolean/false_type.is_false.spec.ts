import { testType, type IsFalse } from '../index.js'

it('returns true if T is false', () => {
	testType.true<IsFalse<false>>(true)
})

it('returns false if T is boolean or true', () => {
	testType.false<IsFalse<boolean>>(true)
	testType.false<IsFalse<true>>(true)
})
it('returns false for special types', () => {
	testType.false<IsFalse<void>>(true)
	testType.false<IsFalse<unknown>>(true)
	testType.false<IsFalse<any>>(true)
	testType.false<IsFalse<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsFalse<undefined>>(true)
	testType.false<IsFalse<null>>(true)
	testType.false<IsFalse<number>>(true)
	testType.false<IsFalse<1>>(true)
	testType.false<IsFalse<string>>(true)
	testType.false<IsFalse<''>>(true)
	testType.false<IsFalse<symbol>>(true)
	testType.false<IsFalse<bigint>>(true)
	testType.false<IsFalse<1n>>(true)
	testType.false<IsFalse<{}>>(true)
	testType.false<IsFalse<{ a: 1 }>>(true)
	testType.false<IsFalse<string[]>>(true)
	testType.false<IsFalse<[]>>(true)
	testType.false<IsFalse<Function>>(true)
	testType.false<IsFalse<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsFalse<false | 1>>(true)
	testType.false<IsFalse<false | boolean>>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsFalse<false & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsFalse<false, 1, 2>, 1>(true)

	testType.equal<IsFalse<any, 1, 2>, 2>(true)
	testType.equal<IsFalse<unknown, 1, 2>, 2>(true)
	testType.equal<IsFalse<never, 1, 2>, 2>(true)
	testType.equal<IsFalse<void, 1, 2>, 2>(true)
})

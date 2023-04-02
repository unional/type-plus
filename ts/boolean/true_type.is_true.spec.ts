import { testType, type IsTrue } from '../index.js'

it('returns true if T is true', () => {
	testType.true<IsTrue<true>>(true)
})

it('returns false if T is boolean or false', () => {
	testType.false<IsTrue<boolean>>(true)
	testType.false<IsTrue<false>>(true)
})

it('returns false for special types', () => {
	testType.false<IsTrue<void>>(true)
	testType.false<IsTrue<unknown>>(true)
	testType.false<IsTrue<any>>(true)
	testType.false<IsTrue<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsTrue<undefined>>(true)
	testType.false<IsTrue<null>>(true)
	testType.false<IsTrue<number>>(true)
	testType.false<IsTrue<1>>(true)
	testType.false<IsTrue<boolean>>(true)
	testType.false<IsTrue<false>>(true)
	testType.false<IsTrue<string>>(true)
	testType.false<IsTrue<''>>(true)
	testType.false<IsTrue<symbol>>(true)
	testType.false<IsTrue<bigint>>(true)
	testType.false<IsTrue<1n>>(true)
	testType.false<IsTrue<{}>>(true)
	testType.false<IsTrue<{ a: 1 }>>(true)
	testType.false<IsTrue<string[]>>(true)
	testType.false<IsTrue<[]>>(true)
	testType.false<IsTrue<Function>>(true)
	testType.false<IsTrue<() => void>>(true)
})

it('returns false for union type', () => {
	testType.false<IsTrue<true | 1>>(true)
	testType.false<IsTrue<true | boolean>>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsTrue<true & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsTrue<true, 1, 2>, 1>(true)
	testType.equal<IsTrue<0, 1, 2>, 2>(true)

	testType.equal<IsTrue<any, 1, 2>, 2>(true)
	testType.equal<IsTrue<unknown, 1, 2>, 2>(true)
	testType.equal<IsTrue<never, 1, 2>, 2>(true)
	testType.equal<IsTrue<void, 1, 2>, 2>(true)
})

import { IsNotTrue, testType } from '../index.js'

it('returns false if T is true', () => {
	testType.false<IsNotTrue<true>>(true)
})

it('returns true if T is boolean or false', () => {
	testType.true<IsNotTrue<boolean>>(true)
	testType.true<IsNotTrue<false>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotTrue<void>>(true)
	testType.true<IsNotTrue<unknown>>(true)
	testType.true<IsNotTrue<any>>(true)
	testType.true<IsNotTrue<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotTrue<undefined>>(true)
	testType.true<IsNotTrue<null>>(true)
	testType.true<IsNotTrue<number>>(true)
	testType.true<IsNotTrue<1>>(true)
	testType.true<IsNotTrue<string>>(true)
	testType.true<IsNotTrue<''>>(true)
	testType.true<IsNotTrue<symbol>>(true)
	testType.true<IsNotTrue<bigint>>(true)
	testType.true<IsNotTrue<1n>>(true)
	testType.true<IsNotTrue<{}>>(true)
	testType.true<IsNotTrue<{ a: 1 }>>(true)
	testType.true<IsNotTrue<string[]>>(true)
	testType.true<IsNotTrue<[]>>(true)
	testType.true<IsNotTrue<Function>>(true)
	testType.true<IsNotTrue<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotTrue<true | 1>>(true)
	testType.true<IsNotTrue<true | boolean>>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsNotTrue<true & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotTrue<true, 1, 2>, 2>(true)
	testType.equal<IsNotTrue<0, 1, 2>, 1>(true)

	testType.equal<IsNotTrue<any, 1, 2>, 1>(true)
	testType.equal<IsNotTrue<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotTrue<never, 1, 2>, 1>(true)
	testType.equal<IsNotTrue<void, 1, 2>, 1>(true)
})

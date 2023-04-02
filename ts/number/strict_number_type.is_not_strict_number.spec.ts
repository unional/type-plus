import { testType, type IsNotStrictNumber } from '../index.js'

it('returns false for number', () => {
	testType.false<IsNotStrictNumber<number>>(true)
})

it('returns true if T is number literial', () => {
	testType.true<IsNotStrictNumber<-1>>(true)
	testType.true<IsNotStrictNumber<0>>(true)
	testType.true<IsNotStrictNumber<1>>(true)
	testType.true<IsNotStrictNumber<1.1>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotStrictNumber<void>>(true)
	testType.true<IsNotStrictNumber<unknown>>(true)
	testType.true<IsNotStrictNumber<any>>(true)
	testType.true<IsNotStrictNumber<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotStrictNumber<undefined>>(true)
	testType.true<IsNotStrictNumber<null>>(true)
	testType.true<IsNotStrictNumber<boolean>>(true)
	testType.true<IsNotStrictNumber<true>>(true)
	testType.true<IsNotStrictNumber<true>>(true)
	testType.true<IsNotStrictNumber<string>>(true)
	testType.true<IsNotStrictNumber<''>>(true)
	testType.true<IsNotStrictNumber<symbol>>(true)
	testType.true<IsNotStrictNumber<bigint>>(true)
	testType.true<IsNotStrictNumber<{}>>(true)
	testType.true<IsNotStrictNumber<string[]>>(true)
	testType.true<IsNotStrictNumber<[]>>(true)
	testType.true<IsNotStrictNumber<Function>>(true)
	testType.true<IsNotStrictNumber<() => void>>(true)
})

it('returns true if N is union of non number', () => {
	testType.true<IsNotStrictNumber<number | string>>(true)
})

it('returns false if N is union of number and number literal', () => {
	testType.false<IsNotStrictNumber<number | 1>>(true)
})

it('returns true if T is intersection of number', () => {
	testType.equal<IsNotStrictNumber<number & { a: 1 }>, true>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotStrictNumber<number, 1, 2>, 2>(true)
	testType.equal<IsNotStrictNumber<0, 1, 2>, 1>(true)

	testType.equal<IsNotStrictNumber<any, 1, 2>, 1>(true)
	testType.equal<IsNotStrictNumber<unknown, 1, 2>, 1>(true)
	testType.equal<IsNotStrictNumber<never, 1, 2>, 1>(true)
	testType.equal<IsNotStrictNumber<void, 1, 2>, 1>(true)
})

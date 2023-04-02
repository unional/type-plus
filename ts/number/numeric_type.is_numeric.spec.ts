import { testType, type IsNumeric } from '../index.js'

it('returns true if N is number', () => {
	testType.true<IsNumeric<number>>(true)

	testType.true<IsNumeric<-1>>(true)
	testType.true<IsNumeric<-2>>(true)
	testType.true<IsNumeric<-0>>(true)
	testType.true<IsNumeric<1>>(true)
	testType.true<IsNumeric<2>>(true)

	testType.true<IsNumeric<1.1>>(true)
})

it('returns true if N is bigint', () => {
	testType.true<IsNumeric<bigint>>(true)

	testType.true<IsNumeric<-1n>>(true)
	testType.true<IsNumeric<-2n>>(true)
	testType.true<IsNumeric<-0n>>(true)
	testType.true<IsNumeric<1n>>(true)
	testType.true<IsNumeric<2n>>(true)
})

it('returns false if N is special types', () => {
	testType.false<IsNumeric<any>>(true)
	testType.false<IsNumeric<unknown>>(true)
	testType.false<IsNumeric<never>>(true)
	testType.false<IsNumeric<void>>(true)
})

test('returns false for other types', () => {
	testType.false<IsNumeric<undefined>>(true)
	testType.false<IsNumeric<null>>(true)
	testType.false<IsNumeric<boolean>>(true)
	testType.false<IsNumeric<true>>(true)
	testType.false<IsNumeric<false>>(true)
	testType.false<IsNumeric<string>>(true)
	testType.false<IsNumeric<''>>(true)
	testType.false<IsNumeric<symbol>>(true)
	testType.false<IsNumeric<{}>>(true)
	testType.false<IsNumeric<string[]>>(true)
	testType.false<IsNumeric<[]>>(true)
	testType.false<IsNumeric<Function>>(true)
	testType.false<IsNumeric<() => void>>(true)
})

it('returns false if T is union of non number', () => {
	testType.false<IsNumeric<number | string>>(true)
})

it('returns true if T is union of number and number literal', () => {
	testType.true<IsNumeric<number | 1>>(true)
})

it('returns true if T is union of mixing number and bigint', () => {
	testType.true<IsNumeric<number | bigint>>(true)
	testType.true<IsNumeric<bigint | 1>>(true)
	testType.true<IsNumeric<number | 1n>>(true)
	testType.true<IsNumeric<1 | 1n>>(true)
})

it('returns true if T is union of bigint and bigint literal', () => {
	testType.true<IsNumeric<bigint | 1n>>(true)
})

it('returns true if T is intersection of number', () => {
	testType.true<IsNumeric<number & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNumeric<-1, 1, 2>, 1>(true)
	testType.equal<IsNumeric<1.1, 1, 2>, 1>(true)

	testType.equal<IsNumeric<any, 1, 2>, 2>(true)
	testType.equal<IsNumeric<unknown, 1, 2>, 2>(true)
	testType.equal<IsNumeric<never, 1, 2>, 2>(true)
	testType.equal<IsNumeric<void, 1, 2>, 2>(true)
})

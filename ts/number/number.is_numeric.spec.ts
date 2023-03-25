import { type, type IsNumeric } from '../index.js'

it('returns true if N is number', () => {
	type.true<IsNumeric<number>>(true)

	type.true<IsNumeric<-1>>(true)
	type.true<IsNumeric<-2>>(true)
	type.true<IsNumeric<-0>>(true)
	type.true<IsNumeric<1>>(true)
	type.true<IsNumeric<2>>(true)

	type.true<IsNumeric<1.1>>(true)
})

it('returns true if N is bigint', () => {
	type.true<IsNumeric<bigint>>(true)

	type.true<IsNumeric<-1n>>(true)
	type.true<IsNumeric<-2n>>(true)
	type.true<IsNumeric<-0n>>(true)
	type.true<IsNumeric<1n>>(true)
	type.true<IsNumeric<2n>>(true)
})

it('returns false if N is special types', () => {
	type.false<IsNumeric<any>>(true)
	type.false<IsNumeric<unknown>>(true)
	type.false<IsNumeric<never>>(true)
	type.false<IsNumeric<void>>(true)
})

test('returns false for other types', () => {
	type.false<IsNumeric<undefined>>(true)
	type.false<IsNumeric<null>>(true)
	type.false<IsNumeric<boolean>>(true)
	type.false<IsNumeric<true>>(true)
	type.false<IsNumeric<false>>(true)
	type.false<IsNumeric<string>>(true)
	type.false<IsNumeric<''>>(true)
	type.false<IsNumeric<symbol>>(true)
	type.false<IsNumeric<{}>>(true)
	type.false<IsNumeric<string[]>>(true)
	type.false<IsNumeric<[]>>(true)
	type.false<IsNumeric<Function>>(true)
	type.false<IsNumeric<() => void>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNumeric<-1, 1, 2>, 1>(true)
	type.equal<IsNumeric<1.1, 1, 2>, 1>(true)

	type.equal<IsNumeric<any, 1, 2>, 2>(true)
	type.equal<IsNumeric<unknown, 1, 2>, 2>(true)
	type.equal<IsNumeric<never, 1, 2>, 2>(true)
	type.equal<IsNumeric<void, 1, 2>, 2>(true)
})

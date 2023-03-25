import { type, type IsInteger } from '../index.js'

it('returns false if N is number as it can contain float', () => {
	type.false<IsInteger<number>>(true)
})

it('returns true if N is an integer literal', () => {
	type.true<IsInteger<-1>>(true)
	type.true<IsInteger<-2>>(true)
	type.true<IsInteger<-0>>(true)
	type.true<IsInteger<1>>(true)
	type.true<IsInteger<2>>(true)
})

it('returns true if N is bigint as bigint can only be integer', () => {
	type.true<IsInteger<bigint>>(true)
	type.true<IsInteger<-1n>>(true)
	type.true<IsInteger<-2n>>(true)
	type.true<IsInteger<-0n>>(true)
	type.true<IsInteger<1n>>(true)
	type.true<IsInteger<2n>>(true)
})

it('returns false if N is a fraction', () => {
	type.false<IsInteger<0.1>>(true)
	type.false<IsInteger<-0.1>>(true)
})

it('returns false if N is special types', () => {
	type.false<IsInteger<any>>(true)
	type.false<IsInteger<unknown>>(true)
	type.false<IsInteger<never>>(true)
	type.false<IsInteger<void>>(true)
})

test('returns false for singular types', () => {
	type.false<IsInteger<undefined>>(true)
	type.false<IsInteger<null>>(true)
	type.false<IsInteger<number>>(true)
	type.false<IsInteger<boolean>>(true)
	type.false<IsInteger<true>>(true)
	type.false<IsInteger<false>>(true)
	type.false<IsInteger<string>>(true)
	type.false<IsInteger<''>>(true)
	type.false<IsInteger<symbol>>(true)
	type.false<IsInteger<{}>>(true)
	type.false<IsInteger<string[]>>(true)
	type.false<IsInteger<[]>>(true)
	type.false<IsInteger<Function>>(true)
	type.false<IsInteger<() => void>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsInteger<-1, 1, 2>, 1>(true)
	type.equal<IsInteger<1.1, 1, 2>, 2>(true)

	type.equal<IsInteger<any, 1, 2>, 2>(true)
	type.equal<IsInteger<unknown, 1, 2>, 2>(true)
	type.equal<IsInteger<never, 1, 2>, 2>(true)
	type.equal<IsInteger<void, 1, 2>, 2>(true)
})

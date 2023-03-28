import { type, type IsNotNumber } from '../index.js'

it('returns false for number', () => {
	type.false<IsNotNumber<number>>(true)
})

it('returns false if T is number literial', () => {
	type.false<IsNotNumber<-1>>(true)
	type.false<IsNotNumber<0>>(true)
	type.false<IsNotNumber<1>>(true)
	type.false<IsNotNumber<1.1>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotNumber<void>>(true)
	type.true<IsNotNumber<unknown>>(true)
	type.true<IsNotNumber<any>>(true)
	type.true<IsNotNumber<never>>(true)
})

it('returns true for all other types', () => {
	type.true<IsNotNumber<undefined>>(true)
	type.true<IsNotNumber<null>>(true)
	type.true<IsNotNumber<boolean>>(true)
	type.true<IsNotNumber<true>>(true)
	type.true<IsNotNumber<true>>(true)
	type.true<IsNotNumber<string>>(true)
	type.true<IsNotNumber<''>>(true)
	type.true<IsNotNumber<symbol>>(true)
	type.true<IsNotNumber<bigint>>(true)
	type.true<IsNotNumber<{}>>(true)
	type.true<IsNotNumber<string[]>>(true)
	type.true<IsNotNumber<[]>>(true)
	type.true<IsNotNumber<Function>>(true)
	type.true<IsNotNumber<() => void>>(true)
})

it('returns true if N is union of non number', () => {
	type.true<IsNotNumber<number | string>>(true)
})

it('returns false if N is union of number and number literal', () => {
	type.false<IsNotNumber<number | 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotNumber<number, 1, 2>, 2>(true)
	type.equal<IsNotNumber<0, 1, 2>, 2>(true)

	type.equal<IsNotNumber<any, 1, 2>, 1>(true)
	type.equal<IsNotNumber<unknown, 1, 2>, 1>(true)
	type.equal<IsNotNumber<never, 1, 2>, 1>(true)
	type.equal<IsNotNumber<void, 1, 2>, 1>(true)
})

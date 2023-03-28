import { type, type IsNumber } from '../index.js'

it('returns true for number', () => {
	type.true<IsNumber<number>>(true)
})

it('returns true if T is number literial', () => {
	type.true<IsNumber<-1>>(true)
	type.true<IsNumber<0>>(true)
	type.true<IsNumber<1>>(true)
	type.true<IsNumber<1.1>>(true)
})

it('returns false for special types', () => {
	type.false<IsNumber<void>>(true)
	type.false<IsNumber<unknown>>(true)
	type.false<IsNumber<any>>(true)
	type.false<IsNumber<never>>(true)
})

it('returns false for all other types', () => {
	type.false<IsNumber<undefined>>(true)
	type.false<IsNumber<null>>(true)
	type.false<IsNumber<boolean>>(true)
	type.false<IsNumber<true>>(true)
	type.false<IsNumber<false>>(true)
	type.false<IsNumber<string>>(true)
	type.false<IsNumber<''>>(true)
	type.false<IsNumber<symbol>>(true)
	type.false<IsNumber<bigint>>(true)
	type.false<IsNumber<{}>>(true)
	type.false<IsNumber<string[]>>(true)
	type.false<IsNumber<[]>>(true)
	type.false<IsNumber<Function>>(true)
	type.false<IsNumber<() => void>>(true)
})

it('returns false if N is union of non number', () => {
	type.false<IsNumber<number | string>>(true)
})

it('returns true if N is union of number and number literal', () => {
	type.true<IsNumber<number | 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNumber<number, 1, 2>, 1>(true)
	type.equal<IsNumber<0, 1, 2>, 1>(true)

	type.equal<IsNumber<any, 1, 2>, 2>(true)
	type.equal<IsNumber<unknown, 1, 2>, 2>(true)
	type.equal<IsNumber<never, 1, 2>, 2>(true)
	type.equal<IsNumber<void, 1, 2>, 2>(true)
})

import { type, type IsStrictNumber } from '../index.js'

it('returns true for number', () => {
	type.true<IsStrictNumber<number>>(true)
})

it('returns false if T is number literial', () => {
	type.false<IsStrictNumber<-1>>(true)
	type.false<IsStrictNumber<0>>(true)
	type.false<IsStrictNumber<1>>(true)
	type.false<IsStrictNumber<1.1>>(true)
})

it('returns false for special types', () => {
	type.false<IsStrictNumber<void>>(true)
	type.false<IsStrictNumber<unknown>>(true)
	type.false<IsStrictNumber<any>>(true)
	type.false<IsStrictNumber<never>>(true)
})

it('returns false for all other types', () => {
	type.false<IsStrictNumber<undefined>>(true)
	type.false<IsStrictNumber<null>>(true)
	type.false<IsStrictNumber<boolean>>(true)
	type.false<IsStrictNumber<true>>(true)
	type.false<IsStrictNumber<false>>(true)
	type.false<IsStrictNumber<string>>(true)
	type.false<IsStrictNumber<''>>(true)
	type.false<IsStrictNumber<symbol>>(true)
	type.false<IsStrictNumber<bigint>>(true)
	type.false<IsStrictNumber<{}>>(true)
	type.false<IsStrictNumber<string[]>>(true)
	type.false<IsStrictNumber<[]>>(true)
	type.false<IsStrictNumber<Function>>(true)
	type.false<IsStrictNumber<() => void>>(true)
})

it('returns false if N is union of non number', () => {
	type.false<IsStrictNumber<number | string>>(true)
})

it('returns true if N is union of number and number literal', () => {
	type.true<IsStrictNumber<number | 1>>(true)
})

it('returns false if T is intersection of number', () => {
	type.equal<IsStrictNumber<number & { a: 1 }>, false>(true)
})

it('can override Then/Else', () => {
	type.equal<IsStrictNumber<number, 1, 2>, 1>(true)
	type.equal<IsStrictNumber<any, 1, 2>, 2>(true)
	type.equal<IsStrictNumber<unknown, 1, 2>, 2>(true)
	type.equal<IsStrictNumber<never, 1, 2>, 2>(true)
	type.equal<IsStrictNumber<void, 1, 2>, 2>(true)
})

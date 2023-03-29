import { type, type IsNotStrictNumber } from '../index.js'

it('returns false for number', () => {
	type.false<IsNotStrictNumber<number>>(true)
})

it('returns true if T is number literial', () => {
	type.true<IsNotStrictNumber<-1>>(true)
	type.true<IsNotStrictNumber<0>>(true)
	type.true<IsNotStrictNumber<1>>(true)
	type.true<IsNotStrictNumber<1.1>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotStrictNumber<void>>(true)
	type.true<IsNotStrictNumber<unknown>>(true)
	type.true<IsNotStrictNumber<any>>(true)
	type.true<IsNotStrictNumber<never>>(true)
})

it('returns true for all other types', () => {
	type.true<IsNotStrictNumber<undefined>>(true)
	type.true<IsNotStrictNumber<null>>(true)
	type.true<IsNotStrictNumber<boolean>>(true)
	type.true<IsNotStrictNumber<true>>(true)
	type.true<IsNotStrictNumber<true>>(true)
	type.true<IsNotStrictNumber<string>>(true)
	type.true<IsNotStrictNumber<''>>(true)
	type.true<IsNotStrictNumber<symbol>>(true)
	type.true<IsNotStrictNumber<bigint>>(true)
	type.true<IsNotStrictNumber<{}>>(true)
	type.true<IsNotStrictNumber<string[]>>(true)
	type.true<IsNotStrictNumber<[]>>(true)
	type.true<IsNotStrictNumber<Function>>(true)
	type.true<IsNotStrictNumber<() => void>>(true)
})

it('returns true if N is union of non number', () => {
	type.true<IsNotStrictNumber<number | string>>(true)
})

it('returns false if N is union of number and number literal', () => {
	type.false<IsNotStrictNumber<number | 1>>(true)
})

it('returns true if T is intersection of number', () => {
	type.equal<IsNotStrictNumber<number & { a: 1 }>, true>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotStrictNumber<number, 1, 2>, 2>(true)
	type.equal<IsNotStrictNumber<0, 1, 2>, 1>(true)

	type.equal<IsNotStrictNumber<any, 1, 2>, 1>(true)
	type.equal<IsNotStrictNumber<unknown, 1, 2>, 1>(true)
	type.equal<IsNotStrictNumber<never, 1, 2>, 1>(true)
	type.equal<IsNotStrictNumber<void, 1, 2>, 1>(true)
})

import { type, type IsPositive } from '../index.js'

it('returns true if T is number or bigint', () => {
	type.true<IsPositive<number>>(true)
	type.true<IsPositive<bigint>>(true)
})

it('returns true if T is 0 or positive literals', () => {
	type.true<IsPositive<-0>>(true)
	type.true<IsPositive<0>>(true)
	type.true<IsPositive<1>>(true)
	type.true<IsPositive<2>>(true)
	type.true<IsPositive<1.0>>(true)
	type.true<IsPositive<1.1>>(true)

	type.true<IsPositive<0n>>(true)
	type.true<IsPositive<1n>>(true)
})

it('returns false if T is negative', () => {
	type.false<IsPositive<-1>>(true)
	type.false<IsPositive<-2>>(true)
})

it('returns boolean if T is any', () => {
	// as `any` is a union of all types,
	// including positive and negative numeric types.
	type.equal<IsPositive<any>, boolean>(true)
})

it('returns false if T is a special type', () => {
	type.false<IsPositive<unknown>>(true)
	type.false<IsPositive<never>>(true)
	type.false<IsPositive<void>>(true)
})

test('returns false for other types', () => {
	type.false<IsPositive<undefined>>(true)
	type.false<IsPositive<null>>(true)
	type.false<IsPositive<boolean>>(true)
	type.false<IsPositive<true>>(true)
	type.false<IsPositive<false>>(true)
	type.false<IsPositive<string>>(true)
	type.false<IsPositive<''>>(true)
	type.false<IsPositive<symbol>>(true)
	type.false<IsPositive<{}>>(true)
	type.false<IsPositive<string[]>>(true)
	type.false<IsPositive<[]>>(true)
	type.false<IsPositive<Function>>(true)
	type.false<IsPositive<() => void>>(true)
})

it('returns true if T is union of positive numeric values', () => {
	type.true<IsPositive<1 | 1.1>>(true)
	type.true<IsPositive<1 | 1n>>(true)
	type.true<IsPositive<1.1 | 1n>>(true)
})

it('returns boolean if T is union of mixing positive and negative value', () => {
	type.boolean<IsPositive<1 | -1>>(true)
})

it('returns false if T is union with negative numeric values', () => {
	type.false<IsPositive<-1 | -2>>(true)
	type.false<IsPositive<-1 | -2n>>(true)
	type.false<IsPositive<-1n | -2n>>(true)
})

it('returns true if T is intersection of number', () => {
	type.true<IsPositive<1 & { a: 1 }>>(true)
	type.true<IsPositive<1n & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsPositive<1, 1, 2>, 1>(true)
	type.equal<IsPositive<1.1, 1, 2>, 1>(true)
	type.equal<IsPositive<1n, 1, 2>, 1>(true)

	type.equal<IsPositive<any, 1, 2>, 1 | 2>(true)

	type.equal<IsPositive<-2, 1, 2>, 2>(true)
	type.equal<IsPositive<unknown, 1, 2>, 2>(true)
	type.equal<IsPositive<never, 1, 2>, 2>(true)
	type.equal<IsPositive<void, 1, 2>, 2>(true)
})

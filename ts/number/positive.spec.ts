import { type, type Positive } from '../index.js'

it('returns T if T is number or bigint', () => {
	type.equal<Positive<number>, number>(true)
	type.equal<Positive<bigint>, bigint>(true)
})

it('returns T if T is 0 or positive', () => {
	type.equal<Positive<-0>, 0>(true)
	type.equal<Positive<0>, 0>(true)
	type.equal<Positive<1>, 1>(true)
	type.equal<Positive<2>, 2>(true)
	type.equal<Positive<1.0>, 1>(true)
	type.equal<Positive<1.1>, 1.1>(true)

	type.equal<Positive<0n>, 0n>(true)
	type.equal<Positive<1n>, 1n>(true)
})

it('returns T if T is bigint', () => {
	type.equal<Positive<0n>, 0n>(true)
	type.equal<Positive<1n>, 1n>(true)
})

it('returns never if T is negative', () => {
	type.never<Positive<-1>>(true)
	type.never<Positive<-2>>(true)
})

it('returns any if T is any', () => {
	// as `any` is a union of all types,
	// including positive and negative numeric types.
	type.equal<Positive<any>, any>(true)
})

it('returns never if T is a special type', () => {
	type.never<Positive<unknown>>(true)
	type.never<Positive<never>>(true)
	type.never<Positive<void>>(true)
})

test('returns never for other types', () => {
	type.never<Positive<undefined>>(true)
	type.never<Positive<null>>(true)
	type.never<Positive<boolean>>(true)
	type.never<Positive<true>>(true)
	type.never<Positive<false>>(true)
	type.never<Positive<string>>(true)
	type.never<Positive<''>>(true)
	type.never<Positive<symbol>>(true)
	type.never<Positive<{}>>(true)
	type.never<Positive<string[]>>(true)
	type.never<Positive<[]>>(true)
	type.never<Positive<Function>>(true)
	type.never<Positive<() => void>>(true)
})

it('returns T if T is union of positive numeric values', () => {
	type.equal<Positive<1 | 1.1>, 1 | 1.1>(true)
	type.equal<Positive<1 | 1n>, 1 | 1n>(true)
	type.equal<Positive<1.1 | 1n>, 1.1 | 1n>(true)
})

it('returns T if T is union of mixing positive and negative value', () => {
	type.equal<Positive<1 | -1>, 1 | -1>(true)
})

it('returns never if T is union with negative numeric values', () => {
	type.never<Positive<-1 | -2>>(true)
	type.never<Positive<-1 | -2n>>(true)
	type.never<Positive<-1n | -2n>>(true)
})

it('returns T if T is intersection of number', () => {
	type.equal<Positive<1 & { a: 1 }>, 1 & { a: 1 }>(true)
	type.equal<Positive<1n & { a: 1 }>, 1n & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	type.equal<Positive<1, 1, 2>, 1>(true)
	type.equal<Positive<1.1, 1, 2>, 1>(true)
	type.equal<Positive<1n, 1, 2>, 1>(true)

	type.equal<Positive<any, 1, 2>, 1 | 2>(true)

	type.equal<Positive<-2, 1, 2>, 2>(true)
	type.equal<Positive<unknown, 1, 2>, 2>(true)
	type.equal<Positive<never, 1, 2>, 2>(true)
	type.equal<Positive<void, 1, 2>, 2>(true)
})

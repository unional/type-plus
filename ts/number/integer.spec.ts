import { type, type Integer } from '../index.js'

it('returns never if T is number as it can contain float', () => {
	type.never<Integer<number>>(true)
})

it('returns T if T is an integer literal', () => {
	type.equal<Integer<-1>, -1>(true)
	type.equal<Integer<-2>, -2>(true)
	type.equal<Integer<-0>, 0>(true)
	type.equal<Integer<1>, 1>(true)
	type.equal<Integer<2>, 2>(true)
	type.equal<Integer<1.0>, 1>(true)
})

it('returns T if T is bigint as bigint can only be integer', () => {
	type.equal<Integer<bigint>, bigint>(true)
	type.equal<Integer<-1n>, -1n>(true)
	type.equal<Integer<-2n>, -2n>(true)
	type.equal<Integer<-0n>, 0n>(true)
	type.equal<Integer<1n>, 1n>(true)
	type.equal<Integer<2n>, 2n>(true)
})

it('returns never if T is a fraction', () => {
	type.never<Integer<1.1>>(true)
	type.never<Integer<-1.1>>(true)
})

it('returns never if T is a special type', () => {
	type.never<Integer<any>>(true)
	type.never<Integer<unknown>>(true)
	type.never<Integer<never>>(true)
	type.never<Integer<void>>(true)
})

test('returns never for other types', () => {
	type.never<Integer<undefined>>(true)
	type.never<Integer<null>>(true)
	type.never<Integer<number>>(true)
	type.never<Integer<boolean>>(true)
	type.never<Integer<true>>(true)
	type.never<Integer<false>>(true)
	type.never<Integer<string>>(true)
	type.never<Integer<''>>(true)
	type.never<Integer<symbol>>(true)
	type.never<Integer<{}>>(true)
	type.never<Integer<string[]>>(true)
	type.never<Integer<[]>>(true)
	type.never<Integer<Function>>(true)
	type.never<Integer<() => void>>(true)
})

it('returns never if T is union of non ineter', () => {
	type.never<Integer<1 | 1.1>>(true)
})

it('returns T if T is union of integers', () => {
	type.equal<Integer<1 | 2>, 1 | 2>(true)
	type.equal<Integer<1n | 2n>, 1n | 2n>(true)
})

it('returns T if T is union of mixing integers of number and bigint', () => {
	type.equal<Integer<1 | bigint>, 1 | bigint>(true)
	type.equal<Integer<1 | 1n>, 1 | 1n>(true)
})

it('returns T if T is intersection of number', () => {
	type.equal<Integer<1 & { a: 1 }>, 1 & { a: 1 }>(true)
	type.equal<Integer<number & { a: 1 }>, never>(true)
})

it('can override Then/Else', () => {
	type.equal<Integer<-1, 1, 2>, 1>(true)
	type.equal<Integer<1.1, 1, 2>, 2>(true)

	type.equal<Integer<any, 1, 2>, 2>(true)
	type.equal<Integer<unknown, 1, 2>, 2>(true)
	type.equal<Integer<never, 1, 2>, 2>(true)
	type.equal<Integer<void, 1, 2>, 2>(true)
})

import { type, type Negative } from '../index.js'

it('returns T if T is number or bigint', () => {
	type.equal<Negative<number>, number>(true)
	type.equal<Negative<bigint>, bigint>(true)
})

it('returns never if T is 0 or positive literals', () => {
	type.equal<Negative<-0>, never>(true)
	type.equal<Negative<0>, never>(true)
	type.equal<Negative<1>, never>(true)
	type.equal<Negative<2>, never>(true)
	type.equal<Negative<1.0>, never>(true)
	type.equal<Negative<1.1>, never>(true)

	type.equal<Negative<0n>, never>(true)
	type.equal<Negative<1n>, never>(true)
})

it('returns T if T is negative', () => {
	type.equal<Negative<-1>, -1>(true)
	type.equal<Negative<-2>, -2>(true)
})

it('returns T | never if T is any', () => {
	type.equal<Negative<any>, any>(true)
})

it('returns never if T is a special type', () => {
	type.never<Negative<unknown>>(true)
	type.never<Negative<never>>(true)
	type.never<Negative<void>>(true)
})

test('returns never for other types', () => {
	type.never<Negative<undefined>>(true)
	type.never<Negative<null>>(true)
	type.never<Negative<boolean>>(true)
	type.never<Negative<true>>(true)
	type.never<Negative<false>>(true)
	type.never<Negative<string>>(true)
	type.never<Negative<''>>(true)
	type.never<Negative<symbol>>(true)
	type.never<Negative<{}>>(true)
	type.never<Negative<string[]>>(true)
	type.never<Negative<[]>>(true)
	type.never<Negative<Function>>(true)
	type.never<Negative<() => void>>(true)
})

it('returns never if T is union of positive numeric values', () => {
	type.equal<Negative<1 | 1.1>, never>(true)
	type.equal<Negative<1 | 1n>, never>(true)
	type.equal<Negative<1.1 | 1n>, never>(true)
})

it('returns T if T is union of mixing positive and negative value', () => {
	type.equal<Negative<1 | -1>, 1 | -1>(true)
})

it('returns T if T is union with negative numeric values', () => {
	type.equal<Negative<-1 | -2>, -1 | -2>(true)
	type.equal<Negative<-1 | -2n>, -1 | -2n>(true)
	type.equal<Negative<-1n | -2n>, -1n | -2n>(true)
})

it('returns T if T is intersection of negative number', () => {
	type.equal<Negative<-1 & { a: 1 }>, -1 & { a: 1 }>(true)
	type.equal<Negative<-1n & { a: 1 }>, -1n & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	type.equal<Negative<-1, 1, 2>, 1>(true)
	type.equal<Negative<-1.1, 1, 2>, 1>(true)
	type.equal<Negative<-1n, 1, 2>, 1>(true)

	type.equal<Negative<any, 1, 2>, 1 | 2>(true)

	type.equal<Negative<2, 1, 2>, 2>(true)
	type.equal<Negative<unknown, 1, 2>, 2>(true)
	type.equal<Negative<never, 1, 2>, 2>(true)
	type.equal<Negative<void, 1, 2>, 2>(true)
})

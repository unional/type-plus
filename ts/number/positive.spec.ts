import { testType, type Positive } from '../index.js'

it('returns T if T is number or bigint', () => {
	testType.equal<Positive<number>, number>(true)
	testType.equal<Positive<bigint>, bigint>(true)
})

it('returns T if T is 0 or positive', () => {
	testType.equal<Positive<-0>, 0>(true)
	testType.equal<Positive<0>, 0>(true)
	testType.equal<Positive<1>, 1>(true)
	testType.equal<Positive<2>, 2>(true)
	testType.equal<Positive<1.0>, 1>(true)
	testType.equal<Positive<1.1>, 1.1>(true)

	testType.equal<Positive<0n>, 0n>(true)
	testType.equal<Positive<1n>, 1n>(true)
})

it('returns T if T is bigint', () => {
	testType.equal<Positive<0n>, 0n>(true)
	testType.equal<Positive<1n>, 1n>(true)
})

it('returns never if T is negative', () => {
	testType.never<Positive<-1>>(true)
	testType.never<Positive<-2>>(true)
})

it('returns any if T is any', () => {
	// as `any` is a union of all types,
	// including positive and negative numeric types.
	testType.equal<Positive<any>, any>(true)
})

it('returns never if T is a special type', () => {
	testType.never<Positive<unknown>>(true)
	testType.never<Positive<never>>(true)
	testType.never<Positive<void>>(true)
})

test('returns never for other types', () => {
	testType.never<Positive<undefined>>(true)
	testType.never<Positive<null>>(true)
	testType.never<Positive<boolean>>(true)
	testType.never<Positive<true>>(true)
	testType.never<Positive<false>>(true)
	testType.never<Positive<string>>(true)
	testType.never<Positive<''>>(true)
	testType.never<Positive<symbol>>(true)
	testType.never<Positive<{}>>(true)
	testType.never<Positive<string[]>>(true)
	testType.never<Positive<[]>>(true)
	testType.never<Positive<Function>>(true)
	testType.never<Positive<() => void>>(true)
})

it('returns T if T is union of positive numeric values', () => {
	testType.equal<Positive<1 | 1.1>, 1 | 1.1>(true)
	testType.equal<Positive<1 | 1n>, 1 | 1n>(true)
	testType.equal<Positive<1.1 | 1n>, 1.1 | 1n>(true)
})

it('returns T if T is union of mixing positive and negative value', () => {
	testType.equal<Positive<1 | -1>, 1 | -1>(true)
})

it('returns never if T is union with negative numeric values', () => {
	testType.never<Positive<-1 | -2>>(true)
	testType.never<Positive<-1 | -2n>>(true)
	testType.never<Positive<-1n | -2n>>(true)
})

it('returns T if T is intersection of number', () => {
	testType.equal<Positive<1 & { a: 1 }>, 1 & { a: 1 }>(true)
	testType.equal<Positive<1n & { a: 1 }>, 1n & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<Positive<1, 1, 2>, 1>(true)
	testType.equal<Positive<1.1, 1, 2>, 1>(true)
	testType.equal<Positive<1n, 1, 2>, 1>(true)

	testType.equal<Positive<any, 1, 2>, 1 | 2>(true)

	testType.equal<Positive<-2, 1, 2>, 2>(true)
	testType.equal<Positive<unknown, 1, 2>, 2>(true)
	testType.equal<Positive<never, 1, 2>, 2>(true)
	testType.equal<Positive<void, 1, 2>, 2>(true)
})
